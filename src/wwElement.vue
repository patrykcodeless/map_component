<template>
  <div 
    :id="mapContainerId" 
    class="leaflet-map-container" 
    :style="containerStyle"
  ></div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  props: {
    uid: { type: String, required: true },
    content: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  setup(props, { emit }) {
    const map = ref(null);
    const marker = ref(null);
    const mapContainerId = ref(`leaflet-map-${props.uid}`);

    /* wwEditor:start */
    const isEditing = computed(() => {
      return props.wwEditorState?.isEditing || false;
    });
    /* wwEditor:end */

    const containerStyle = computed(() => ({
      width: '100%',
      height: props.content?.height || '400px',
      minHeight: '200px',
    }));

    const mapConfig = computed(() => ({
      center: [
        Number(props.content?.centerLat) || 52.2297,
        Number(props.content?.centerLng) || 21.0122,
      ],
      zoom: Number(props.content?.zoom) || 10,
      tileLayer: props.content?.tileLayer || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: props.content?.attribution || '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }));

    const getContainer = () => {
      console.log('[Leaflet] Getting container...');
      console.log('[Leaflet] Container ID:', mapContainerId.value);
      
      // Priorytet 1: wwLib.getFrontDocument (dla WeWeb Editor)
      try {
        if (typeof window !== 'undefined' && window.wwLib?.getFrontDocument) {
          const doc = window.wwLib.getFrontDocument();
          if (doc) {
            const container = doc.getElementById(mapContainerId.value);
            if (container && container instanceof HTMLElement) {
              console.log('[Leaflet] ✓ Container found via wwLib.getFrontDocument()');
              return container;
            }
          }
        }
      } catch (e) {
        console.log('[Leaflet] wwLib not available:', e.message);
      }
      
      // Priorytet 2: document.getElementById (dla trybu developerskiego)
      try {
        if (typeof document !== 'undefined') {
          const container = document.getElementById(mapContainerId.value);
          if (container && container instanceof HTMLElement) {
            console.log('[Leaflet] ✓ Container found via document.getElementById');
            return container;
          }
        }
      } catch (e) {
        console.error('[Leaflet] Error accessing document:', e);
      }
      
      console.error('[Leaflet] ✗ Container not found');
      return null;
    };

    const initializeMap = (retryCount = 0) => {
      const maxRetries = 10;
      
      console.log(`[Leaflet] Initialization attempt ${retryCount + 1}/${maxRetries}`);
      
      const container = getContainer();
      
      if (!container) {
        console.warn(`[Leaflet] Container not found, retry ${retryCount + 1}/${maxRetries}`);
        if (retryCount < maxRetries) {
          const delay = Math.min(100 * (retryCount + 1), 500);
          setTimeout(() => {
            initializeMap(retryCount + 1);
          }, delay);
          return;
        }
        console.error(`[Leaflet] ✗ Container not found after ${maxRetries} retries`);
        return;
      }

      if (!(container instanceof HTMLElement)) {
        console.error('[Leaflet] ✗ Container is not HTMLElement:', typeof container);
        return;
      }

      const hasDimensions = container.offsetWidth > 0 && container.offsetHeight > 0;
      console.log('[Leaflet] Container dimensions:', container.offsetWidth, 'x', container.offsetHeight);
      
      if (!hasDimensions && retryCount < maxRetries) {
        console.warn('[Leaflet] Container has no dimensions, waiting...');
        setTimeout(() => {
          initializeMap(retryCount + 1);
        }, 100);
        return;
      }

      if (map.value) {
        console.log('[Leaflet] Map already exists, skipping initialization');
        return;
      }

      console.log('[Leaflet] Creating map instance...');
      
      try {
        const config = mapConfig.value;
        console.log('[Leaflet] Map config:', config);
        
        // Utworzenie mapy Leaflet
        map.value = L.map(mapContainerId.value, {
          center: config.center,
          zoom: config.zoom,
        });

        // Dodanie warstwy kafelków
        L.tileLayer(config.tileLayer, {
          attribution: config.attribution,
          maxZoom: 19,
        }).addTo(map.value);

        console.log('[Leaflet] ✓ Map instance created successfully');

        // Event: kliknięcie na mapę
        map.value.on('click', (e) => {
          console.log('[Leaflet] Map clicked:', e.latlng);
          emit('trigger-event', {
            name: 'map-click',
            event: {
              lat: e.latlng.lat,
              lng: e.latlng.lng,
              coordinates: [e.latlng.lat, e.latlng.lng],
            },
          });
        });

        // Event: mapa załadowana
        map.value.whenReady(() => {
          console.log('[Leaflet] Map ready');
          emit('trigger-event', {
            name: 'map-loaded',
            event: { map: map.value },
          });
        });

        // Dodaj marker jeśli jest włączony
        updateMarker();
        
      } catch (error) {
        console.error('[Leaflet] ✗ Failed to initialize map:', error);
        emit('trigger-event', {
          name: 'map-error',
          event: { error: error.message },
        });
      }
    };

    const updateMarker = () => {
      if (!map.value) return;

      // Usuń stary marker jeśli istnieje
      if (marker.value) {
        map.value.removeLayer(marker.value);
        marker.value = null;
      }

      // Dodaj nowy marker jeśli jest włączony
      if (props.content?.showMarker) {
        const config = mapConfig.value;
        marker.value = L.marker(config.center)
          .addTo(map.value)
          .bindPopup(props.content?.markerText || 'Location');
        
        console.log('[Leaflet] Marker added');
      }
    };

    const destroyMap = () => {
      if (map.value) {
        map.value.remove();
        map.value = null;
        marker.value = null;
        console.log('[Leaflet] Map destroyed');
      }
    };

    // Reaktywność - reaguj na zmiany właściwości
    watch(
      () => [
        props.content?.centerLat,
        props.content?.centerLng,
        props.content?.zoom,
        props.content?.height,
      ],
      (newValues, oldValues) => {
        if (!map.value) return;

        const config = mapConfig.value;
        const [newLat, newLng, newZoom] = newValues;
        const [oldLat, oldLng, oldZoom] = oldValues || [];

        // Zmiana centrum
        if ((newLat !== undefined && newLat !== oldLat) || (newLng !== undefined && newLng !== oldLng)) {
          try {
            map.value.setView(config.center, map.value.getZoom());
            console.log('[Leaflet] Center updated:', config.center);
            updateMarker(); // Przenieś marker do nowego centrum
          } catch (error) {
            console.error('[Leaflet] Failed to set center:', error);
          }
        }

        // Zmiana zoomu
        if (newZoom !== undefined && newZoom !== oldZoom) {
          try {
            map.value.setZoom(config.zoom);
            console.log('[Leaflet] Zoom updated:', config.zoom);
          } catch (error) {
            console.error('[Leaflet] Failed to set zoom:', error);
          }
        }
      },
      { deep: true }
    );

    // Reaktywność dla markera
    watch(
      () => [props.content?.showMarker, props.content?.markerText],
      () => {
        updateMarker();
      },
      { deep: true }
    );

    // Reaktywność dla stylu mapy (wymaga reinicjalizacji)
    watch(
      () => props.content?.tileLayer,
      (newLayer, oldLayer) => {
        if (!map.value || newLayer === oldLayer) return;

        console.log('[Leaflet] Tile layer changed, reinitializing...');
        destroyMap();
        setTimeout(() => {
          initializeMap();
        }, 100);
      }
    );

    onMounted(() => {
      console.log('[Leaflet] Component mounted');
      console.log('[Leaflet] Props:', { uid: props.uid, content: props.content });
      
      setTimeout(() => {
        console.log('[Leaflet] Starting map initialization...');
        initializeMap();
      }, 200);
    });

    onBeforeUnmount(() => {
      destroyMap();
    });

    return {
      mapContainerId,
      containerStyle,
      /* wwEditor:start */
      isEditing,
      /* wwEditor:end */
    };
  },
};
</script>

<style scoped>
.leaflet-map-container {
  width: 100%;
  position: relative;
}

/* Naprawka dla ikon Leaflet - domyślne ikony z CDN */
:deep(.leaflet-default-icon-path) {
  background-image: url('https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png');
}

/* Dodatkowe style dla lepszego wyglądu */
:deep(.leaflet-popup-content) {
  font-family: inherit;
}

:deep(.leaflet-container) {
  font-family: inherit;
}
</style>


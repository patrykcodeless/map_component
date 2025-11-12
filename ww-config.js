export default {
  editor: {
    label: {
      en: "Leaflet Map",
    },
    icon: "map",
  },
  properties: {
    centerLat: {
      label: { en: "Latitude" },
      type: "Number",
      section: "settings",
      defaultValue: 52.2297,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "number",
        tooltip: "Latitude coordinate (-90 to 90)",
      },
      propertyHelp: "Latitude coordinate for map center (Warsaw default: 52.2297)",
      /* wwEditor:end */
    },
    centerLng: {
      label: { en: "Longitude" },
      type: "Number",
      section: "settings",
      defaultValue: 21.0122,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "number",
        tooltip: "Longitude coordinate (-180 to 180)",
      },
      propertyHelp: "Longitude coordinate for map center (Warsaw default: 21.0122)",
      /* wwEditor:end */
    },
    zoom: {
      label: { en: "Zoom Level" },
      type: "Number",
      section: "settings",
      min: 1,
      max: 19,
      step: 1,
      defaultValue: 10,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "number",
        tooltip: "Zoom level between 1 and 19",
      },
      propertyHelp: "Initial zoom level of the map (1 = world, 19 = building)",
      /* wwEditor:end */
    },
    height: {
      label: { en: "Map Height" },
      type: "Length",
      section: "style",
      defaultValue: "400px",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "CSS height value (e.g., '400px', '50vh', '100%')",
      },
      propertyHelp: "Height of the map container",
      /* wwEditor:end */
    },
    tileLayer: {
      label: { en: "Map Style" },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", label: "OpenStreetMap (Standard)" },
          { value: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", label: "OpenTopoMap (Topographic)" },
          { value: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png", label: "Stadia Smooth (Light)" },
          { value: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png", label: "Stadia Dark" },
        ],
      },
      defaultValue: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Tile layer URL template",
      },
      propertyHelp: "Choose map tile style (OpenStreetMap is completely free)",
      /* wwEditor:end */
    },
    showMarker: {
      label: { en: "Show Center Marker" },
      type: "OnOff",
      section: "settings",
      defaultValue: true,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "boolean",
        tooltip: "Show marker at center",
      },
      propertyHelp: "Display a marker pin at the map center",
      /* wwEditor:end */
    },
    markerText: {
      label: { en: "Marker Popup Text" },
      type: "Text",
      section: "settings",
      defaultValue: "Location",
      bindable: true,
      hidden: content => !content?.showMarker,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Text to display in marker popup",
      },
      propertyHelp: "Text shown when clicking the marker",
      /* wwEditor:end */
    },
    attribution: {
      label: { en: "Custom Attribution" },
      type: "Text",
      section: "settings",
      defaultValue: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Map attribution text (HTML allowed)",
      },
      propertyHelp: "Attribution text displayed on the map (supports HTML)",
      /* wwEditor:end */
    },
  },
  triggerEvents: [
    {
      name: "map-loaded",
      label: { en: "On Map Loaded" },
      event: { map: null },
    },
    {
      name: "map-click",
      label: { en: "On Map Click" },
      event: { lat: 0, lng: 0, coordinates: [0, 0] },
    },
    {
      name: "map-error",
      label: { en: "On Map Error" },
      event: { error: "" },
    },
  ],
};


# 🗺️ Nomadano Leaflet Map Component for WeWeb

An **interactive, lightweight, and completely FREE** map component for [WeWeb](https://www.weweb.io/) powered by [Leaflet.js](https://leafletjs.com/) and OpenStreetMap.

## ✨ Features

- 🆓 **100% Free** - No API keys, no usage limits, no hidden costs
- 🪶 **Lightweight** - Only ~40KB vs Mapbox's ~700KB
- 🎨 **Multiple Map Styles** - OpenStreetMap, OpenTopoMap, Stadia Maps
- 📍 **Customizable Markers** - Show/hide markers with custom popup text
- 🎯 **Fully Reactive** - All properties update in real-time
- ⚡ **Fast** - Optimized for WeWeb Editor and production
- 🔧 **Easy to Use** - Simple configuration, works out of the box
- 🌍 **No Dependencies** - Just Leaflet.js, no external services required

## 📦 Installation

### Option 1: From GitHub (Recommended)

1. In WeWeb Editor: **Dashboard** → **Coded Components**
2. Click **"Import element"** or **"+ New"**
3. Select **"From GitHub"**
4. Enter:
   - **Repository**: `https://github.com/patrykcodeless/map_component`
   - **Branch**: `main`
   - **Version**: `v1.0.0` (or `latest`)
5. Click **"Import"**

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/patrykcodeless/map_component.git
cd map_component

# Install dependencies
npm install

# Start development server
npm run serve
```

Then in WeWeb Editor:
- Click **</> Developer** icon
- Add `https://localhost:8080`
- Component appears in Add menu

## 🚀 Quick Start

1. **Add Component**: Drag **"Leaflet Map"** from Add menu → Plugins
2. **Configure**: Set latitude, longitude, zoom level in Settings
3. **Customize**: Choose map style, adjust height, add markers
4. **Done!** Map is ready to use 🎉

## ⚙️ Configuration

### Map Settings

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **Latitude** | Number | 52.2297 | Center latitude coordinate |
| **Longitude** | Number | 21.0122 | Center longitude coordinate |
| **Zoom Level** | Number | 10 | Zoom level (1-19) |
| **Map Style** | Select | OpenStreetMap | Tile layer style |
| **Map Height** | Length | 400px | Container height |
| **Show Center Marker** | Boolean | true | Display marker at center |
| **Marker Popup Text** | Text | "Location" | Marker popup text |
| **Custom Attribution** | Text | OSM | Map attribution (HTML) |

### Map Styles

- **OpenStreetMap** - Standard street map (default)
- **OpenTopoMap** - Topographic map with terrain
- **Stadia Smooth** - Light, minimalist style
- **Stadia Dark** - Dark mode style

All styles are **completely free** with no API key required!

## 🎯 Trigger Events

Connect workflows to these events:

### On Map Loaded
Fires when the map finishes loading.
```javascript
event: { map: LeafletMapInstance }
```

### On Map Click
Fires when user clicks on the map.
```javascript
event: { 
  lat: 52.2297, 
  lng: 21.0122, 
  coordinates: [52.2297, 21.0122] 
}
```

### On Map Error
Fires if map initialization fails.
```javascript
event: { error: "Error message" }
```

## 📖 Examples

### Basic Map (Warsaw, Poland)
```javascript
Latitude: 52.2297
Longitude: 21.0122
Zoom: 10
```

### Custom Location (New York)
```javascript
Latitude: 40.7128
Longitude: -74.0060
Zoom: 12
Map Style: OpenStreetMap
```

### Dark Mode Map
```javascript
Map Style: Stadia Dark
Show Center Marker: true
Marker Popup Text: "Our Office"
```

### Responsive Height
```javascript
Map Height: 80vh
```

## 🔧 Development

### Build for Production
```bash
npm run build
```

Generates `dist/manager.js` for WeWeb deployment.

### Project Structure
```
map_component/
├── src/
│   └── wwElement.vue     # Main Vue component
├── dist/                 # Built files (auto-generated)
├── ww-config.js         # WeWeb configuration
├── package.json         # Dependencies
└── README.md           # This file
```

## 🆚 Why Leaflet vs Mapbox?

| Feature | Leaflet | Mapbox GL JS |
|---------|---------|--------------|
| **Cost** | FREE ✅ | Requires API key + usage limits |
| **Size** | 40KB ✅ | 700KB |
| **Setup** | Instant ✅ | Complex (tokens, auth) |
| **Tiles** | OpenStreetMap, many others ✅ | Mapbox only |
| **Community** | Huge ✅ | Medium |
| **Learning Curve** | Easy ✅ | Moderate |

## 📝 Version History

### v1.0.0 (Initial Release)
- Interactive Leaflet map with multiple tile styles
- Configurable center, zoom, markers
- Trigger events for workflows
- Full WeWeb Editor integration
- Optimized container initialization

## 🤝 Contributing

Issues and pull requests welcome at:
https://github.com/patrykcodeless/map_component

## 📄 License

MIT License - Free for personal and commercial use

## 🙏 Credits

- [Leaflet.js](https://leafletjs.com/) - Amazing open-source mapping library
- [OpenStreetMap](https://www.openstreetmap.org/) - Free map data by contributors
- [WeWeb](https://www.weweb.io/) - No-code platform
- Built with ❤️ by [patrykcodeless](https://github.com/patrykcodeless)

## 📞 Support

- **Issues**: https://github.com/patrykcodeless/map_component/issues
- **WeWeb Community**: https://community.weweb.io/

---

Made with 🗺️ for the WeWeb community

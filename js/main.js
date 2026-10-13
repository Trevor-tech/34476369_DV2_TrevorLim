// The Great Toy Reroute — embeds every chart from charts/*.vg.json.
// All paths are relative so the page works from any sub-path (e.g. username.github.io/repo/).

const TEXT_FONT = "'Figtree', system-ui, sans-serif";
const DISPLAY_FONT = "'Fredoka', 'Trebuchet MS', sans-serif";

// Shared look for every chart. Vega-Lite and Vega both read these keys.
const THEME = {
  background: null,
  font: TEXT_FONT,
  padding: {top: 4, right: 8, bottom: 8, left: 4},
  title: {
    anchor: "start",
    font: DISPLAY_FONT,
    fontSize: 20,
    fontWeight: 600,
    color: "#1f1b16",
    subtitleFont: TEXT_FONT,
    subtitleFontSize: 14,
    subtitleColor: "#5a534a",
    subtitlePadding: 6,
    offset: 18
  },
  axis: {
    labelFont: TEXT_FONT,
    titleFont: TEXT_FONT,
    labelColor: "#5a534a",
    labelFontSize: 12,
    titleColor: "#5a534a",
    titleFontSize: 12,
    titleFontWeight: "normal",
    gridColor: "#e8e2d6",
    domainColor: "#c9c2b6",
    tickColor: "#c9c2b6"
  },
  legend: {
    labelFont: TEXT_FONT,
    titleFont: TEXT_FONT,
    labelColor: "#5a534a",
    titleColor: "#1f1b16",
    labelFontSize: 12,
    titleFontSize: 12
  },
  header: {labelFont: DISPLAY_FONT, titleFont: TEXT_FONT, labelColor: "#1f1b16", labelFontSize: 14, titleColor: "#5a534a"},
  view: {stroke: null},
  text: {font: TEXT_FONT, color: "#1f1b16", fontSize: 12}
};

// [container, spec] in page order. File numbers follow the chart inventory, not the page order.
const CHARTS = [
  ["#c05", "charts/05-streamgraph.vg.json"],
  ["#c11", "charts/11-waterfall.vg.json"],
  ["#c01", "charts/01-world-choropleth.vg.json"],
  ["#c02", "charts/02-world-small-multiples.vg.json"],
  ["#c06", "charts/06-bump-chart.vg.json"],
  ["#c07", "charts/07-slope-graph.vg.json"],
  ["#c13", "charts/13-horizon.vg.json"],
  ["#c03", "charts/03-connection-map.vg.json"],
  ["#c04", "charts/04-port-symbols.vg.json"],
  ["#c10", "charts/10-origin-state-heatmap.vg.json"],
  ["#c08", "charts/08-calendar-heatmap.vg.json"],
  ["#c09", "charts/09-cycle-plot.vg.json"],
  ["#c12", "charts/12-lag-loop.vg.json"]
];

const OPTIONS = {
  renderer: "svg",
  actions: false,
  config: THEME
};

function embedAll() {
  for (const [el, spec] of CHARTS) {
    vegaEmbed(el, spec, OPTIONS).catch((err) => {
      console.error(`Chart ${spec} failed to render:`, err);
      const box = document.querySelector(el);
      if (box) box.textContent = "This chart could not be loaded.";
    });
  }
}

// Wait for the web fonts so Vega measures labels in the right typeface; never wait more than 3 s.
const fontsReady = document.fonts
  ? Promise.all([
      document.fonts.load("400 12px Figtree"),
      document.fonts.load("700 12px Figtree"),
      document.fonts.load("600 20px Fredoka")
    ]).catch(() => null)
  : Promise.resolve();
const timeout = new Promise((resolve) => setTimeout(resolve, 3000));
Promise.race([fontsReady, timeout]).then(embedAll);

# The Great Toy Reroute

*Australia buys more toys than ever — so why are fewer of them coming from China?*

A single-page data story for FIT3179 Data Visualisation 2 (Monash University), built entirely with
Vega-Lite (12 charts) and Vega (1 chart).

- **Author:** Trevor Lim Yong Guan · 34476369
- **Date:** 25 October 2026
- **AI use:** see [Acknowledgement of AI use](#acknowledgement-of-ai-use)

## Run it locally

The page loads CSV and TopoJSON files, so it must be served over HTTP (opening `index.html` as a
`file://` URL will not load the data). From this folder:

```
python -m http.server 8000
```

then open <http://localhost:8000>. Every path in the project is relative, so the folder works unchanged
from a sub-path such as `username.github.io/repo-name/`.

## Files

```
index.html            the page (narrative, figure containers, notes, sources)
css/style.css         layout and type (hand-rolled, no framework)
js/main.js            one vegaEmbed call per chart + the shared chart theme
charts/*.vg.json      13 chart specifications, pretty-printed (2-space indent), $schema first
data/*.csv            5 source CSVs (unchanged) + 3 small reference tables made for this project
data/*.topojson       world (Natural Earth 1:110m) and Australian states (ABS ASGS 2021, simplified)
rationale.md          what / why / how for every chart (Munzner)
sketch_brief.md       one-page brief for the hand-drawn layout sketch
```

| File | Chart | Idiom | Library |
|---|---|---|---|
| `01-world-choropleth.vg.json` | Figure 3 | Choropleth map (Equal Earth) with a year slider | Vega-Lite |
| `02-world-small-multiples.vg.json` | Figure 4 | Small-multiple choropleths, shared scale | Vega-Lite |
| `03-connection-map.vg.json` | Figure 8 | Connection (flow) map with a financial-year menu | Vega-Lite |
| `04-port-symbols.vg.json` | Figure 9 | Proportional-symbol map (Australian Albers) | Vega-Lite |
| `05-streamgraph.vg.json` | Figure 1 | Streamgraph | Vega-Lite |
| `06-bump-chart.vg.json` | Figure 5 | Bump chart | Vega-Lite |
| `07-slope-graph.vg.json` | Figure 6 | Slope graph | Vega-Lite |
| `08-calendar-heatmap.vg.json` | Figure 11 | Calendar heatmap | Vega-Lite |
| `09-cycle-plot.vg.json` | Figure 12 | Cycle plot with an origin menu | Vega-Lite |
| `10-origin-state-heatmap.vg.json` | Figure 10 | Heatmap matrix | Vega-Lite |
| `11-waterfall.vg.json` | Figure 2 | Waterfall chart | Vega-Lite |
| `12-lag-loop.vg.json` | Figure 13 | Connected scatterplot (closed loop) | Vega |
| `13-horizon.vg.json` | Figure 7 | Horizon chart | Vega-Lite |

Chart 12 is written in Vega rather than Vega-Lite because it joins two separately transformed datasets
(a seasonal index from each source), which Vega-Lite's `lookup` cannot do.

All shares, ranks, seasonal indices, running totals and moving averages are computed **inside the
specs** with `transform`s; the source CSVs are exactly as extracted.

## Data sources

| Data | Publisher | Licence | URL | Project file |
|---|---|---|---|---|
| Merchandise trade statistical pivot tables — SITC 894 total imports by country (calendar years 2006–2025), by state of destination and country (financial years 2015–16 to 2024–25) and monthly (Jan 2023 – Aug 2026). Values in A$'000. Totals cross-validated against ABS Data Explorer (MERCH_IMP). | Department of Foreign Affairs and Trade (DFAT) | CC BY 4.0 | https://www.dfat.gov.au/trade/trade-and-investment-data-information-and-publications/trade-statistics/merchandise-trade-statistical-pivot-tables | `toys_imports_country_year.csv`, `toys_imports_state_country.csv`, `toys_imports_monthly.csv` |
| Monthly Household Spending Indicator (5682.0), original series, $ million — Total, Goods, Services, Discretionary, Non Discretionary, Jul 2012 – Aug 2026 | Australian Bureau of Statistics (ABS) | CC BY 4.0 | https://www.abs.gov.au/statistics/economy/finance/monthly-household-spending-indicator/latest-release | `household_spending_monthly.csv` |
| Household Expenditure Survey, Australia (6530.0) — recreation share of spending, weekly recreation spend and the recreation & culture CPI, 7 survey cycles 1984 to 2015–16 | ABS | CC BY 4.0 | https://www.abs.gov.au/statistics/economy/finance/household-expenditure-survey-australia-summary-results/latest-release | `recreation_longrun.csv` |
| Consumer Price Index, Australia (6401.0) — All groups CPI, weighted average of eight capital cities, original, quarterly | ABS (Data API) | CC BY 4.0 | https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia/latest-release · API query: https://data.api.abs.gov.au/rest/data/ABS,CPI/1.10001.10.50.Q?startPeriod=1993-Q3&endPeriod=2016-Q2 | `cpi_all_groups.csv` |
| ASGS Edition 3 (2021) State and Territory boundaries, `STE_2021_AUST_SHP_GDA2020.zip` | ABS | CC BY 4.0 | https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs-edition-3/jul2021-jun2026/access-and-downloads/digital-boundary-files | `au_states.topojson` |
| Natural Earth 1:110m countries, packaged as `countries-110m.json` in world-atlas 2.0.2 | Natural Earth (public domain); world-atlas by Mike Bostock (ISC licence) | Public domain / ISC | https://github.com/topojson/world-atlas · https://www.naturalearthdata.com/ | `world-110m.topojson` |
| Country centre points (`countries.csv`, DSPL canonical dataset) | Google | CC BY 4.0 | https://developers.google.com/public-data/docs/canonical/countries_csv | `origin_iso.csv` (lat, lon) |
| Port coordinates | Wikipedia (see list below) | CC BY-SA 4.0 | see below | `state_ports.csv` |

## Libraries and fonts

- Vega 6.4.0 — https://cdn.jsdelivr.net/npm/vega@6.4.0/build/vega.min.js
- Vega-Lite 6.4.3 — https://cdn.jsdelivr.net/npm/vega-lite@6.4.3/build/vega-lite.min.js
- Vega-Embed 7.2.0 — https://cdn.jsdelivr.net/npm/vega-embed@7.2.0/build/vega-embed.min.js
- Fredoka (display) and Figtree (text) from Google Fonts, SIL Open Font Licence.

Each CDN URL was checked to return HTTP 200 with a UMD build before use.

## Acknowledgement of AI use
(to be done)

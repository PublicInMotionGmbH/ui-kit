# Talixo Charts

UI components for charts

## How to install

Package is available as `@talixo/charts` in NPM registry, so you can use it in your project
using `npm install @talixo/charts --save` or `yarn add @talixo/charts`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/checkbox: ^0.1.0`
- `@talixo/shared: ^0.1.0`
- `lodash: ^4.17.10`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`
- `react-vis: ^1.9.2`

These packages are required by `@talixo/charts`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Chart
It allows any props which are allowed for react-vis 'FlexibleXYPlot'. Additionally, it handles some differently:

Property name | Type            | Default               | Description                    
--------------|-----------------|:---------------------:|-----------------------------------------
className     | string          | n/a                   | Additional class name passed to wrapper.
data          | ChartData       | `[{ dataItems: [] }]` | Line chart data.
timeSeries    | boolean         | `false`               | Idicates if x axis should be displayed as date 
type          | `line` or `bar` | `line`                | Type of chart (line or bar).
xAxisTitle    | string          | n/a                   | X axis title.
yAxisTitle    | string          | n/a                   | Y axis title.
zoomable      | boolean         | `false`               | Indicates if chart is zoomable, can be applied to chart.

### PieChart
It allows any props which are allowed for react-vis 'FlexibleXYPlot'. Additionally, it handles some differently:

Property name | Type            | Default               | Description                    
--------------|-----------------|:---------------------:|-----------------------------------------
arcProps      | object          | n/a                   | Additional props that are passed to react-vis ArcSeries.
className     | string          | n/a                   | Additional class name passed to wrapper.
data          | PieData         | `{ dataItems: [] }`   | Line chart data.

### FilterableChart

It allows any props which are allowed for react-vis 'FlexibleXYPlot'. Additionally, it handles some differently:

Property name     | Type            | Default               | Description                    
------------------|-----------------|:---------------------:|-----------------------------------------
legendPosition    | object          | n/a                   | Position of the legend relative to chart.
legendProps       | string          | n/a                   | Additional props to be passed to legend. Accepts any property which is allowed for Legend Component.
pathToDataItems   | array           | `[]`                  | Path to data items tha will be filtered.

### Legend
It allows any props which are allowed for `div`. Additionally, it handles some differently:

Property name | Type                  | Default               | Description                    
--------------|-----------------------|:---------------------:|-----------------------------------------
className     | string                | n/a                   | Additional class name passed to wrapper.
dataItems     | ChartData or PieData  | `[]`                  | Data items to be displayed
direction     | string                | `vertical`            | Idicates if x axis should be displayed as date 
onClick       | `line` or `bar`       | `line`                | Type of chart (line or bar).


## Property shapes

### ChartData

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | Additional class name passed to DataSeries (react-vis VerticalBarSeries or Line Series).
color         | string    | n/a     | Color of the data series.
dataItems     | DataItem  | n/a     | Data inforamtion to be displayed in chart.
disabled      | boolean   | `false` | Indicates if data will be shown in the chart.
label         | string    | n/a     | onClick callback, gets the clicked item, index and event as parameter.


### DataItem 

Property name | Type                | Default | Description                    
--------------|---------------------|:-------:|--------------------------------
x             | string or number    | n/a     | X axis data.
y             | string or number    | n/a     | Y axis data.


### PieData

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
dataItems     | PieItem[] | n/a     | Data inforamtion to be displayed in chart.
title         | string    | n/a     | Title of chart.


### PieItem

Property name | Type              | Default | Description                    
--------------|-------------------|:-------:|--------------------------------
className     | string            | n/a     | Additional class name passed to DataSeries (react-vis VerticalBarSeries or Line Series).
color         | string            | n/a     | Color of the arc.
disabled      | boolean           | `false` | Indicates if data will be shown in the chart.
label         | string            | n/a     | Label of data series.
value         | number or string  | n/a     | Value of data series.

## Changelog

- **1.0.0** - initial version

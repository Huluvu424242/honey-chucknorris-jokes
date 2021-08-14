# honey-chucknorris-jokes

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute        | Description                     | Type                        | Default     |
| -------------------- | ---------------- | ------------------------------- | --------------------------- | ----------- |
| `feedAdministration` | --               | Feeds Administration Komponente | `HTMLHoneyNewsFeedsElement` | `undefined` |
| `localBasePath`      | `local-basepath` | base of local site              | `any`                       | `undefined` |
| `newsFeed`           | --               | News reader Komponente          | `HTMLHoneyNewsFeedElement`  | `undefined` |
| `siteBasePath`       | `site-basepath`  | base of remote site             | `any`                       | `undefined` |
| `verbose`            | `verbose`        | enable console logging          | `boolean`                   | `false`     |


## Dependencies

### Depends on

- [honey-chucknorris-jokes-header](header)
- [honey-chucknorris-jokes-feed](news)
- [honey-chucknorris-jokes-feeds](feeds)
- [honey-chucknorris-jokes-statistic](statistic)

### Graph
```mermaid
graph TD;
  honey-chucknorris-jokes --> honey-chucknorris-jokes-header
  honey-chucknorris-jokes --> honey-chucknorris-jokes-feed
  honey-chucknorris-jokes --> honey-chucknorris-jokes-feeds
  honey-chucknorris-jokes --> honey-chucknorris-jokes-statistic
  style honey-chucknorris-jokes fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)* by Huluvu424242

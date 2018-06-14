# Fetch XRPL Accounts

This small tool connects to a `rippled` server using websockets and fetches all `AccountRoot` records for a specific ledger index. The output will be saved into `ledgerindex_accounts.json`, eg. `123456_accounts.json`.

## Use

```
npm run fetch ledgerindex
```

Eg.
```
npm run fetch 39374682
```

Optional you can specify the websocket server to connect to:

```
npm run fetch 39374682 wss://s2.ripple.com
```

The default server is: **wss://s1.ripple.com**

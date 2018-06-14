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

# List accounts for a ledger index

You should first fetch all AccountRoot information for the specific ledger index (see "Fetch XRPL Accounts" above this section).

When the ledger is fetched (and `ledgerindex_accounts.json` exists) you can list all the accounts found **sorted alphabetically**:

```
npm run list ledgerindex
```

Eg. 

```
npm run list 39374682
```

## Sorting on ledger index

You can use `awk` to change the order of the output, and use `sort -n` (numeric). Sample: 

```
node accountlist.js 37374682 | awk '{print $3,$2,$1}' | sort -n
```
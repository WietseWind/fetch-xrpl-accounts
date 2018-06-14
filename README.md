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

# Advanced

## Check the account count

_Assuming you fetched the ledger indexes used:_ you can count (`wc -l`) the output lines:

```
node accountlist.js 37374682 | wc -l
```

## Create account list for ledger index

_Assuming you fetched the ledger indexes used:_ you can cut the `accountlist` output and store the stdout:

```
node accountlist.js 37374682 | cut -d " " -f 1 > 37374682.txt
```

Now do this for another ledger index:

```
node accountlist.js 39374682 | cut -d " " -f 1 > 39374682.txt
```

Now use `diff` to check for the newly created accounts between the two ledgers:

```
diff -u 37374682.txt 39374682.txt | grep -E "^\+"|cut -d "+" -f 2
```

## Sorting on ledger index of last transaction

_Assuming you fetched the ledger indexes used:_ you can use `awk` to change the order of the output, and use `sort -n` (numeric). Sample: 

```
node accountlist.js 37374682 | awk '{print $3,$2,$1}' | sort -n
```

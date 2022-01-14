# @identity-box/cli

CLI for Identity Box. Handy, easy to update, run via `npx`.
The commands will go and come.

## Usage

```bash
$ npx @identity-box/cli --help
```

or

```bash
$ npx github:/identity-box/cli --help
```

## Commands

### info

When installing service on the identity box, it would be nice to easily
query for the currently running version of the service. Since version `0.1.33`, each package prints its current version when starting to the standard output. Yet, looking through pm2 logs is not so convenient and this utility allows you to query the version of the service through an IPC call.

#### Examples:

Query the version of the identity-box.nameservice:

```bash
$ npx @identity-box/cli info identity-box.nameservice
```

Query the version of the identity-box.nameservice but route the request through the box-office:

```bash
$ npx @identity-box/cli info --boxOffice identity-box.nameservice
```

### upgrade-to-yarn2

This command is handy when you still have services installed below version `0.1.33` and you want to upgrade. Since version `0.1.33` we recommend using our packages with yarn 2 (berry). Using the `upgrade-to-yarn2` command you can conveniently update the current installation to switch to the yarn version 2 (berry).

#### Usage

```bash
$ cd ~/idbox/nameservice
$ npx @identity-box/cli upgrade-to-yarn2
```

to silent the output from the executed commands:

```bash
$ cd ~/idbox/nameservice
$ npx @identity-box/cli upgrade-to-yarn2 -s
```

### install-service

This command will (fresh) install an Identity Box service. The command takes a service name as an argument.

> The command will first try to delete the directory indicated by the service name, and then it will re-create the that directory and install the given service there.

#### Usage

```bash
$ cd ~/idbox/
$ npx @identity-box/cli install-service <serviceName>
```

to silent the output from the executed commands:

```bash
$ cd ~/idbox
$ npx @identity-box/cli install-service <serviceName> -s
```

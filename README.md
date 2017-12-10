# rollup-bad-binary-issue

<https://github.com/rollup/rollup/issues/1786>

Reproduction of an issue with Rollup and binary files. This seems to be caused
by the loading of files as `utf-8`:
<https://github.com/rollup/rollup/blob/master/src/utils/defaults.js#L6-L8>

To get around this, one could add a `load` function to one's plugin, but that
causes all files to be loaded using that function rather than _just_ the files
transformed by the individual plugin:
<https://github.com/rollup/rollup/blob/master/src/Bundle.js#L82>

To reproduce the issue:

1.  Run `npm install`.

2.  Run `npm run test`.

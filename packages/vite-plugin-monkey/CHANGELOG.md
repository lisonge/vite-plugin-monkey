# v4.0.0

## Breaking Changes

- drop commonjs support, now it is esm only
- require vite `^5.0.0`

## Bug Fixes

- module can not be resolved if it is only esm
- use jsdelivr to replace bootcdn because bootcdn will return virus-infected code

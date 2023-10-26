# Categories

In this document we will define the different categories that are used to compare the different solutions. The goal is to have objective categories to compare the different solutions.
When the value is able to be measured, we will define the measurement method. If the value is not able to be measured, we will define the criteria to evaluate the value.

## Credential Format

### Crypto Agility

**Field type: boolean**

A credential format has crypto agility, when I am able to set **ANY** kind of cryptographic algorithm for the signature. This is important for future proofing the credential format.
A format that has specific requirements like "you can use any pairing friendly curve" is not crypto agile, because it is not possible to use any other kind of algorithm like RSA or one of the post quantum algorithms. In this case the field has to be set to "False", but can be added with more information like:

```json
  "Crypto Agility": {
    "Value": false,
    "Description": "only elliptic curves are supported"
  },
```

The value of the field is independent from the implementation support. E.g. one SDK allows you to pass any kind of algorithm, but another implementation only supports one specific algorithm.

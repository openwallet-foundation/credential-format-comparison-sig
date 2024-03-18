![Credential Profiles](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fopenwallet-foundation%2Fcredential-format-comparison-sig%2Fbadge-info%2Fprofiles.json)

## Introduction

This SIG is dedicated to maintaining information about available credential formats for the benefit of OWF projects and the wider community. The topic is more complex than one might assume on first sight, since there are more than 14 formats for representing digital credentials and most of those formats can be combined with different signature algorithms, ways to represent cryptographic keys (with alone more than a hundred DID methods), status management methods, trust management methods and so on.

There is pre-existing work started at Internet Identity Workshop (IIW 34, Spring 2022) and extended and augmented during Rebooting the Web of Trust (RWOT-XI, The Hague, Sept 2022).

Article: https://github.com/WebOfTrustInfo/rwot11-the-hague/blob/master/final-documents/credential-profile-comparison.pdf, [Source Code](article.md)

The pre defined [Google sheet](./viewer/tools/Credential%20Comparison%20Matrix.xlsx) was split into the data part and the visualization part. The data part is now in the [data folder](./data) and the visualization part is in the [viewer folder](./viewer). This allows to use the power of github to collaborate on the data and to reuse the data in other projects.

## Structure of this repo

- Data: Includes the data for the viewer.
- viewer: Includes the viewer that will visualize the data.

## Participating

This SIG is an open group. Anyone in the OpenWallet Foundation community can join and participate. There is no formal sign up process. Just show up and participate.

We are meeting every two weeks on Wednesday, click [here](https://zoom-lfx.platform.linuxfoundation.org/meeting/93634454850?password=060d1576-f263-433d-b755-f4a3d05ce0a7) to get a calendar invitation.

If you are interested in participating, please join the [OpenWallet Foundation Discord](https://discord.com/invite/yjvGPd5FCU) and participate in the discussion in the [#credential-format-comparison-sig](https://discord.com/channels/1022962884864643214/1113500130419671080) channel.

All recordings of the sessions are available in the [wiki](https://github.com/openwallet-foundation/credential-format-comparison-sig/wiki).

# Gitpod

Open this repository in Gitpod without the requirement to install anything

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/openwallet-foundation/credential-format-comparison-sig)

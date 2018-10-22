# Teltonika RUT955 data receiver
This is a (simple) data receiver for a Teltonika RUT955 (and probably more of them if they use the same data format). It supports a TCP server right now and it'll decode the AVL packets for you. It'll decode all of the specific elements of the packet except for parsing the values of the IO elements (as of right now), instead it'll give you a [Buffer](https://nodejs.org/api/buffer.html) with the raw data in it.
It is released and licensed under the Apache License 2.0.

## Getting started
To get started I recommend looking at the examples which includes using the tiny event based server I made or making your own using the parsers.
1. Fork this repo
2. Decide what kind of server you want
3. Play with it on your own machine
4. Host it somewhere (it should be able to run on an instance or serverless)

### Have a question?
Shoot me a question on my twitter [@eXeDK](https://twitter.com/eXeDK).

## Using the server
Two ways to do it as I see it.
1. Host it on a normal server
2. Put it in some cluster of your choice
3. Go serverless!

## Inspiration
A lot of this code is written just using the [RUT955 protocols](https://wiki.teltonika.lt/index.php?title=RUT955_Protocols) page on Teltonika's wiki.

I've found some related projects around the internet. I'll try to list them here for your enjoyment:
* [Teltonika 1556 data parser](https://github.com/wahisoufiane/gpsapps/tree/master/data/teltonika_1556/avl/demo) in Java
* [FMXXXX Parser](https://github.com/barryib/FMXXXX_Parser) in PHP
* [Teltonika FM Parser](https://github.com/uro/teltonika-fm-parser) in PHP

All of them are good in their own way. I might have gotten some ideas from some of them.
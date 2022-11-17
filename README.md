# Fashion Cloud Assignment

Author: Mohammad Khallaghi

A REST API for a simple and basic cache system

## How to run
`npm install`
`npm start`

## List of APIs:
|Method|URI| body                               | response                                                                                                                  | description                                       |
|------|---|------------------------------------|---------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------|
|`GET`| `/v1/key/<key>`|                                    | `{value: "<value>"}`                                                                                                      | return the value of the key                       |
|`GET`| `/v1/all`|                                    | `[{key: "<key>", value: "<value>"}]`                                                                                      | return all the key and values stored in the cache |
|`PUT`| `/v1/`| `{"key": "KEY", "value": "VALUE"}` | `{"key": "akbar", "value": "asghara","createdAt": "2022-11-17T16:22:37.910Z","_id": "6376611b199ea40a4df1a8d7","__v": 0}` | Add a new key to cache and return it              |
|`DELETE` |`/v1/key/<key>`|                                    | `{"result": {"acknowledged": true,"deletedCount": 1 } }`                                                                  | Delete the <key> from the cache                   | 
|`DELETE`| `/v1/all` |                                    | `{"result": {"acknowledged": true,"deletedCount": 5 } }`                                                                  | Delete all the keys from the cache                


# Lack of functionality
In this project to implement Time To Live feature I use `expires` feature of mongodb which 
expires the record after the amount of time that we provide and when we want to retrieve the same key from 
`/v1/key/<key>` it will automatically generate a random string for the key that missed it actually act as 
described in the PDF but when we call `/v1/all` it can not retrieve the expired records which is not as 
described in the PDF. 

# Testing 
Unfortunately I could not complete the testing part because of lack of time and I already over run the time of implementing the project also I should mention that 
the speed of internet here in Iran was very slow due to the protests and overall situation of Iran which slowed me down 
significantly for some simple tasks like `npm install`
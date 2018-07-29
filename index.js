'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

// Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ROUTES

app.get('/', function(req, res) {
	res.send("Hi I am a chatbot")
})

let token = "EAAd57KqwCOIBAIfi7h5yPtWuumxXNa1pcaZCWiRZBvemBsM8ZCwORLMUoPdi8gsyGUHHHTrlEUI8Os6cWGVZADDkHFUwmiRgTAxHHPQenMKOdC7hC4OZAxiLrqIqwO3Arn8GgA1QU8PtdgZCR24UupKIdFWjZBdZA23JoTN5aDraZCIZCpicZCaGV8q"

// Facebook

app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "TUHmawbiChatBot") {
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token")
})

app.post('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i]
		let sender = event.sender.id
	//	if (event.message && event.message.text) {
	//		let text = event.message.text
	//		sendText(sender, "Text echo: " + text.substring(0, 100))
	if (event.message && event.message.text== "History" || event.message.text=="Tell Me History"){
		sendText(sender, "History of Technological University (Hmawbi)/n Our University was opened as a Technical High School on 23-10-1989 and upgraded as a Government Technical Institute on 1-12-1998 and also upgraded as a Government Technological College on 8-1-2001. Finally, This is upgraded as a Technological University on 20-1-2007.")
	}
		}
	}
	res.sendStatus(200)
})

function sendText(sender, text) {
	let messageData = {text: text}
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs : {access_token: token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message : messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
	})
}

app.listen(app.get('port'), function() {
	console.log("running: port")
})

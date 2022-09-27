# Formidable Broadcaster

Formidable Broadcaster is based on SSE (Server-Sent Events) technology. It is a simple, lightweight and easy to use plugin that allows you to broadcast messages to all connected clients.

![trace](https://raw.githubusercontent.com/formidablejs/broadcaster/dev/demo.gif)

## Requirements

 * [@formidablejs/framework](https://www.npmjs.com/package/@formidablejs/framework): `>=0.x.x`
 * [Redis](https://github.com/redis/node-redis): `>= 4.x.x`

## Config

Add `BroadcastServiceResolver` in the `config/app.imba` or `config/app.ts` config under `resolvers`:

```js
...

resolvers: {
	...
	require('@formidablejs/broadcaster').BroadcastServiceResolver
```

## Usage

### Backend

```py
import { Route } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'
import { Channel } from '@formidablejs/broadcaster'

Route.post '/test', do(request\Request)
	Channel.publish(request.input('name')).on('users')
```

### Frontend

```py
import { useForm } from '@formidablejs/view'
import { subscribe } from '@formidablejs/broadcaster/src/client'

export tag Home
	prop form = useForm({
		name: ''
	})

	prop name

	def mount
		subscribe 'users', do(name)
			self.name = name

			imba.commit!

	def addUser
		form.post('/user', {
			onSuccess: do form.name = ''
		})

	def render
		<self>
			<h1> "Hello {name ?? 'Stranger'}"

			<input type="text" bind=form.name>

			<button @click=addUser>
				"Click here"

```

Security
-------

If you discover any security related issues, please email donaldpakkies@gmail.com instead of using the issue tracker.

License
-------

The MIT License (MIT). Please see [License File](LICENSE) for more information.

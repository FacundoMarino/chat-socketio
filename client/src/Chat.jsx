import { useEffect, useState } from 'react';
import { socket } from './utils/config';

export const Chat = () => {
	const [message, setMessage] = useState('');
	const [chats, setChats] = useState([
		{
			body: 'Bienvenido al Chat',
			from: 'Robot',
		},
	]);

	const handleSubmit = (event) => {
		event.preventDefault();
		socket.emit('message', message);
		const NewMessage = {
			body: message,
			from: 'Yo',
		};
		setChats([...chats, NewMessage]);
		setMessage('');
	};

	useEffect(() => {
		const receiveMessage = (message) => {
			setChats([...chats, message]);
		};
		socket.on('message', receiveMessage);

		return () => {
			socket.off('message', receiveMessage);
		};
	}, [chats]);

	return (
		<div className='pt-[50px]'>
			<div className='m-auto h-[640px] w-[314px] bg-[#F8F6FA] rounded-[50px] shadow-inherit p-3 '>
				<div className='absolute w-32 h-6 bg-[#F8F6FA] rounded-[10px] top left-1/2 transform -translate-x-1/2'></div>
				<div className=' flex justify-around h-[80px] w-[18rem] rounded-t-[50px] top-1 bg-gradient-to-r from-purple-500 to-pink-500'>
					<img
						src='https://mdbcdn.b-cdn.net/img/new/avatars/2.webp'
						className='rounded-full h-10 w-10 m-6 border-2 border-white'
						alt='Avatar'
					/>
					<p className='h-10 w-16 m-8 text-white'>Friend</p>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='flex flex-col h-[530px] w-full rounded-b-[50px] bg-[#EDE4F3] border-solid	'>
						<ul className='h-[30em] overflow-y-auto'>
							{chats.map((message, index) => (
								<li key={index}>
									<p
										className={` break-words p-2 m-4 w-auto h-auto rounded-[10px]   ${
											message.from === 'Yo' ? 'bg-[#E0C5EA]' : 'bg-[#DAD7DF]'
										} `}
									>
										{message.from}: {message.body}
									</p>
								</li>
							))}
						</ul>
						<input
							className='p-2 m-4 rounded-[40px] m-4 w-auto h-10'
							type='text'
							onChange={(e) => setMessage(e.target.value)}
							value={message}
							placeholder='Type a message...'
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

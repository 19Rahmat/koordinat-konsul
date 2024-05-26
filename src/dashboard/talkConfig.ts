export interface User {
    id: string;
    name: string;
    email: string;
    photoUrl: string;
    welcomeMessage: string;
    role: string;
  }
  
  export const oliver: User = {
    id: '1920',
    name: 'Oliver Johnson',
    email: 'oliver.johnson@example.com',
    photoUrl: 'https://talkjs.com/images/avatar-4.jpg',
    welcomeMessage: 'Hey there!',
    role: 'default',
  };
  
  export const abby: User = {
    id: '2017',
    name: 'Abby Klein',
    email: 'abby.klein@example.com',
    photoUrl: 'https://talkjs.com/images/avatar-1.jpg',
    welcomeMessage: 'Hello, how are you today?',
    role: 'default',
  };
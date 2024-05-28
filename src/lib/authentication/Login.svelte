<script lang="ts">
        import {login, setSessionToken} from '../function/getData';
      

        let username = '';
        let password = '';

        async function handleLogin(){
          try{
            const token = await login(username, password);
            alert("token = "+token);
            // let hasSession = true;
            setSessionToken(token);
            window.location.href ="/";
          }catch (error){
            console.log(error);
          }
        }
	
      </script>
          <section class="flex flex-col md:flex-row h-screen items-center">
      
        <div class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <video autoplay muted loop class="w-full h-full object-cover">
            <source src="https://ik.imagekit.io/nurman/koordinat-konsul/logo-biru.mp4?updatedAt=1716579609204" type="video/mp4">
          </video>
        </div>
      
        <div class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
              flex items-center justify-center">
          <div class="w-full h-100">
           
      
            <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>
            <hr class="my-6 border-gray-300 w-full">
            <form class="mt-6" action="#" method="POST" on:submit|preventDefault={handleLogin}>
              <div>
                <label class="block text-gray-700" for="stambuk">Username</label>
                <input
                  type="text"
                  name="stambuk"
                  id=""
                  placeholder="Enter Nim / Nidn"
                  class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required bind:value={username}/>
              </div>
            
              <div class="mt-4">
                <label class="block text-gray-700" for="password">Password</label>
                <input
                  type="text"
                  name="password"
                  id=""
                  placeholder="Enter Password"
                  minlength="6"
                  class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                              focus:bg-white focus:outline-none"
                  required bind:value={password}/>
              </div>
            
              <div class="text-right mt-2">
                
              </div>
            
              <button
                type="submit"
                class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                            px-4 py-3 mt-6">Log In</button
              >
            </form>
         
  
        
        <hr class="my-6 border-gray-300 w-full">
       
          </div>
        </div>
      
      </section>
<script>
        import { navigate } from "svelte-routing";
        import Login from "../authentication/Login.svelte";
        import Signup from "../authentication/Signup.svelte";

        let hasSession = Boolean;

	/**
	 * @param {any} value
	 */
        function updateSession(value){
         let hasSession = value;
        }
        let judul = '';
        let showLogin =true;
        function viewLogin(){
          // showLogin = true;
          showLogin = !showLogin;
 
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
           
            {#if showLogin}
            <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">{judul = "log in to your account"}</h1>
            <hr class="my-6 border-gray-300 w-full">
              <Login bind:updateSession={hasSession} />
              <p class="mt-8">Belum punya akun? <button on:click={viewLogin} class="text-blue-500 hover:text-blue-700 font-semibold">Create an
                account
        </button></p>
        {:else}
        <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">{judul = "Create new account"}</h1>
        <hr class="my-6 border-gray-300 w-full">
        <Signup />
        <p class="mt-8">Sudah Punya akunn ? <button on:click={viewLogin} class="text-blue-500 hover:text-blue-700 font-semibold">Log in to your account
  </button></p>
        {/if}
            


      
      
      
          </div>
        </div>
      
      </section>
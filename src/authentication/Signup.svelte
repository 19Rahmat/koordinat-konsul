       
       <script>
            import { useForm, Hint, HintGroup, validators, minLength, required, email } from "svelte-use-form";
    const form = useForm();
    const requiredMessage = "Kolom ini harus di isi";
       </script>
       <form class="mt-6" action="#" method="POST" use:form>
          <div>
            <label class="block text-gray-700" for="email">Enter new email</label>
            <input type="email" name="email" id="" placeholder="Enter Email Address" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"  required use:validators={[required, email]}>
            <HintGroup for="email">
              <Hint on="required">{requiredMessage}</Hint>
              <Hint on="email" hideWhenRequired>This must be a valid email</Hint>	
            </HintGroup>
          </div>
  
          <div class="mt-4">
            <label class="block text-gray-700" for="password">Password</label>
            <input type="password" name="password" id="" placeholder="Enter Password" minlength="6" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none" required>
                  
          </div>
          <div class="mt-4">
            <label class="block text-gray-700" for="re-password">Re-type Password</label>
            <input type="password" name="re-password" id="" placeholder="Retype Password" minlength="6" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none" required>
          </div>

  
          <button type="submit" class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6" disabled={!$form.valid} on:click|preventDefault>Create Accounts</button>
        </form>
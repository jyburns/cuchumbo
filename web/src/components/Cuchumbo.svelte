<script>
  import { onMount } from 'svelte';
  import { isValidEmailAddress } from '../lib/validtate';

  import PlusIcon from './icons/PlusIcon.svelte';
  import MinusIcon from './icons/MinusIcon.svelte';

  const housekeeping = "Way to take charge and organize a cuchumbo, let us know who's leading the pack:";
  const includeYourself = "Include yourself in the cuchumbo?";
  const namePlaceholder = "Name";
  const emailPlaceholder = "Email";
  const addTheNames = "Add the names and email addresses of any other participants below:";
  const cuchumbo = "Cuchumbo!";

  let organizerName = "";
  let organizerEmail = "";
  let hasUserFocusedOrganizerName = false;
  let hasUserFocusedOrganizerEmail = false;
  let isOrganizerIncluded = true;

  let participants = [];
  let participantEmails = new Set();
  let currentParticipant;
  let hasCurrentParticipantNameChanged = false;
  let hasCurrentParticipantEmailChanged = false;
  let isCurrentParticipantNameValid = true;
  let isCurrentParticipantEmailValid = true;

  let processingCuchumbo = false;
  let success = false;

  $: isOrganizerNameInvalid = (organizerName.trim().length === 0) && hasUserFocusedOrganizerName;
  $: isOrganizerEmailInvalid = !isValidEmailAddress(organizerEmail) && hasUserFocusedOrganizerEmail;
  $: isOrganizerValid = !isOrganizerNameInvalid && !isOrganizerEmailInvalid && hasUserFocusedOrganizerName && hasUserFocusedOrganizerEmail;
  $: isCurrentParticipantValid = isCurrentParticipantNameValid && 
                                 hasCurrentParticipantNameChanged &&
                                 isCurrentParticipantEmailValid &&
                                 hasCurrentParticipantEmailChanged;

  $: isValidCuchumbo = isOrganizerValid && participants.length > 1;

  const addParticipant = () => {
    if (isCurrentParticipantValid) participantEmails.add(currentParticipant.email);

    currentParticipant = { name: "", email: ""};
    participants = [...participants, currentParticipant];
    resetValidation();
  };

  const removeParticipant = (index) => {
    participantEmails.delete(participants[index].email);
    participants.splice(index, 1);
    participants = participants;
  }

  const resetValidation = () => {
    hasCurrentParticipantNameChanged = false;
    hasCurrentParticipantEmailChanged = false;
    isCurrentParticipantNameValid = true;
    isCurrentParticipantEmailValid = true;
  }

  const validateParticipantName = (name) => {
    isCurrentParticipantNameValid = name.trim().length;
    hasCurrentParticipantNameChanged = true;
  };

  const validateParticipantEmail = (email) => {
    isCurrentParticipantEmailValid = isValidEmailAddress(email) && isEmailUnique(email);
    hasCurrentParticipantEmailChanged = true;
  };

  const isEmailUnique = (email) => {
    return !participantEmails.has(email) && (organizerEmail !== email);
  };

  const submitCuchumbo = () => {
    if (processingCuchumbo) return;

    processingCuchumbo = true;
    setTimeout(() => {
      window.alert("Some day this will work!");
      console.log("CuchumboObject", buildCuchumboObject());
      processingCuchumbo = false;
      success = true;
    }, 2000);
  };

  const buildCuchumboObject = () => {
    return {
      organizerName: organizerName,
      organizerEmail: organizerEmail,
      isOrganizerIncluded: isOrganizerIncluded,
      participants: participants
    };
  };

  onMount(() => {
    addParticipant();
  });
</script>

<div class="container">
  <p>{housekeeping}</p>
  <form class="organizer-form">
    <div class="organizer">
      <input bind:value={organizerName}
             class="text-input"
             class:invalid={isOrganizerNameInvalid}
             placeholder={namePlaceholder}
             on:focus={() => hasUserFocusedOrganizerName = true}/>
      <input bind:value={organizerEmail}
             class="text-input"
             class:invalid={isOrganizerEmailInvalid}
             placeholder={emailPlaceholder}
             on:focus={() => hasUserFocusedOrganizerEmail = true}/>
    </div>
    <div class="organizer-checkbox">
      <input type=checkbox bind:checked={isOrganizerIncluded}/>
      <span>{includeYourself}</span>
    </div>
  </form>

  <p>{addTheNames}</p>
  <div class="participants">
    {#each participants as participant, index}
      <div class="participant">
        <form class="participant-form" autocomplete="off">
          <input bind:value={participant.name}
                 class="text-input"
                 class:invalid={(currentParticipant === participant) && !isCurrentParticipantNameValid}
                 disabled={currentParticipant !== participant}
                 placeholder={namePlaceholder}
                 on:keyup={() => validateParticipantName(participant.name)}/>
          <input bind:value={participant.email}
                 class="text-input"
                 class:invalid={(currentParticipant === participant) && !isCurrentParticipantEmailValid}
                 disabled={currentParticipant !== participant}
                 placeholder={emailPlaceholder}
                 on:keyup={() => validateParticipantEmail(participant.email)}/>
        </form>
        {#if currentParticipant === participant}
          <button class="add-participant"
                  on:click={addParticipant}
                  disabled={!isCurrentParticipantValid}>
            <PlusIcon/>
          </button>
        {:else}
          <button class="remove-participant"
                  on:click={() => removeParticipant(index)}>
            <MinusIcon/>
          </button>
        {/if}
      </div>
    {/each}
  </div>
  <button class="submit"
          disabled={!isValidCuchumbo || success}
          on:click={submitCuchumbo}>
    {cuchumbo}
  </button>
</div>

<style>
  button {
    border: none;
    border-radius: 4px;
    transition: all 0.25s ease;
  }

  :global(button svg) {
    height: 20px;
  }

  :global(button:disabled svg) {
    fill: var(--disabled-text-color);
    stroke: var(--disabled-text-color);
  }

  :global(button:enabled svg) {
    fill: var(--default-text-color);
    stroke: var(--default-text-color);
  }

  button:enabled {
    color: var(--default-text-color);
    cursor: pointer;
  }

  button:enabled:hover {
    box-shadow: 2px 2px 7px var(--default-border-color);
  }

  input[type="checkbox"] {
    margin: 0 5px 0 0;
  }

  span {
    font-size: 0.9em;
  }

  .text-input {
    border-radius: 4px;
    border-color: var(--default-border-color);
    color: var(--default-text-color);
    height: 35px;
    margin: 0;
    width: 200px;
  }

  .text-input + .text-input {
    margin-top: 5px;
  }

  .container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 20px;
  }

  .organizer-form {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .organizer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .organizer-checkbox {
    align-items: center;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
  }

  .participants {
    display: flex;
    flex-direction: column;
  }

  .participant {
    align-items: center;
    display: flex;
    flex-direction: row;
    position: relative;
  }

  .participant + .participant {
    margin-top: 20px;
  }

  .participant-form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: min-content;
  }

  .invalid {
    border-color: var(--error-color);
  }

  .add-participant {
    align-items: center;
    display: flex;
    height: 35px;
    justify-content: center;
    margin: 0 0 0 10px;
    position: absolute;
    right: -45px;
    width: 35px;
  }

  .add-participant:disabled {
    background-color: var(--disabled-button-color);
  }

  .add-participant:enabled {
    background-color: var(--default-button-color);
  }

  .remove-participant {
    align-items: center;
    background-color: var(--secondary-button-color);
    display: flex;
    height: 35px;
    justify-content: center;
    margin: 0 0 0 10px;
    position: absolute;
    right: -45px;
    width: 35px;
  }

  .submit {
    height: 40px;
    margin-top: 30px;
    width: 240px;
  }

  .submit:disabled {
    background-color: var(--disabled-button-color);
  }

  .submit:enabled {
    background-color: var(--default-button-color);
  }

  @media (min-width: 640px) {
		.text-input + .text-input {
      margin-left: 10px;
      margin-top: 0;
    }
    
    .container {
      margin-top: 30px;
    }

    .participant + .participant {
      margin-top: 10px;
    }

    .participant-form {
      width: initial;
    }
	}
</style>
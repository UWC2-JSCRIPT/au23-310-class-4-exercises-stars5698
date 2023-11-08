// Donna Quach, JavaScript 310B, Autumn 2023
// Class 4 Exercises 

/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function(kind, internalTemp, doneness) {
  // Write function HERE
  isCooked = false; // As an initializer (before we run if statements)
  // Had to use strict equality '===' for checking kind and doneness in order to return correct isCooked boolean
  // (i.e. Using '==' did not work)
  // Checking to see if user provided "chicken" for kind 
  if(kind === 'chicken')
  {
    // Then check if provided internal temperature is OK
    if(internalTemp >= 165) 
    {
      isCooked = true; 
      return isCooked; 
    }
    else
    {
      return isCooked; // Which would be false 
    }
  }
  // Checking to see if user provided "beef" for kind 
  if(kind === 'beef') 
  {
    // Then check if provided doneness and internal temperature are OK 
    // First for well-done beef 
    if(doneness === 'well')
    {
      if(internalTemp >= 155) 
      {
        isCooked = true; 
        return isCooked; 
      }
      else 
      {
        return isCooked; // Which would be false
      }
    }
    // Then for medium rare beef
    if(doneness === 'medium')
    {
      if(internalTemp >= 138) 
      {
        isCooked = true; 
        return isCooked; 
      }
      else 
      {
        return isCooked; // Which would be false
      }
    }
    // Then for rare beef 
    if(doneness === 'rare')
    {
      if(internalTemp >= 125) 
      {
        isCooked = true; 
        return isCooked; 
      }
      else 
      {
        return isCooked; // Which would be false
      }
    }
  }
}



// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true
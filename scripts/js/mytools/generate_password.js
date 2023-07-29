var lengthInput = document.getElementById('length');
lengthInput.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    generatePassword();
  }
});
function generatePassword() {
  const length = parseInt(document.getElementById('length').value);
  if (length < 8 || length > 128) {
      alert('Password length must be between 8 and 128.');
      return;
  }
  var uppercase = document.getElementById('uppercase').checked;
  var lowercase = document.getElementById('lowercase').checked;
  var numbers = document.getElementById('numbers').checked;
  var symbols = document.getElementById('symbols').checked;
   excludeSimilar = document.getElementById('exclude-similar').checked;
  var excludeAmbiguous = document.getElementById('exclude-ambiguous').checked;
  var uppercaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Excludes I, L, O
  var lowercaseChars = 'abcdefghijkmnopqrstuvwxyz'; // Excludes l
  var numberChars = '23456789'; // Excludes 0, 1
  var symbolChars = '@#$%';
  var ambiguousChars = '{}[]()/\\\'"`~,;:.<>';
  let chars = '';
  if (uppercase) chars += uppercaseChars;
  if (lowercase) chars += lowercaseChars;
  if (numbers) chars += numberChars;
  if (symbols) chars += symbolChars;
  if (excludeSimilar) {
    chars = chars.replace(/[iIlLoO10]/g, ''); // Remove similar characters
  }
  if (excludeAmbiguous) {
    chars = chars.replace(new RegExp('[' + ambiguousChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ']', 'g'), ''); // Remove ambiguous characters
  }
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById('textoutput').value = password;
}
function copyPassword() {
  var password = document.getElementById('textoutput');
  password.select();
  document.execCommand('copy');
}
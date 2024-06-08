const setModifiers = (ability) => {
  if (ability < 2) {
    return -5;
  } else if (ability < 4) {
    return - 4;
  } else if (ability < 6) {
    return -3
  } else if (ability < 8) {
    return -2;
  } else if (ability < 10) {
    return -1;
  } else if (ability < 12) {
    return 0;
  } else if (ability < 14) {
    return '+1';
  } else if (ability < 16) {
    return '+2';
  } else if (ability < 18) {
    return '+3';
  } else if (ability < 20) {
    return '+4';
  } else if (ability === 20) {
    return '+5';
  }
}

module.exports = {
  setModifiers
}
const body_length_checker = (rad) => {
  return b_length >= rad + 40;
};

const convert_to_rad = (val) => {
  return Number(val * (Math.PI / 180));
};

const convert_to_deg = (val) => {
  return Number((val * 180) / Math.PI);
};

const phi2 = (rad, b_length, phi1) => {
  const delta = Number(b_length / rad);
  const sinPhi1 = Math.sin(convert_to_rad(phi1));
  const cosPhi1 = Math.cos(convert_to_rad(phi1));
  const phi2Rad = Math.atan(sinPhi1 / (delta - cosPhi1));
  return convert_to_deg(phi2Rad).toFixed(2);
};

const u = (rad, b_length, phi1) => {
  const delta = Number(b_length / rad);
  const cosPhi1 = Math.cos(convert_to_rad(phi1));
  const upper = 1 - delta * cosPhi1;
  const lower = 1 - 2 * delta * cosPhi1 + delta * delta;
  const uVal = upper/lower;
  return uVal.toFixed(2);
};

export const DATA = {
  radius: 50,
  body_length: 90,
  body_length_checker,
  phi1: 0,
  phi2,
  phi2Value: 0,
  u,
  backstage: {
    lk: 140,
    l0: 100,
  },
};

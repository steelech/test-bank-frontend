export function initialize(appInstance) {
  appInstance.lookup('service:cognito');
}

export default {
  name: 'cognito',
  initialize
};

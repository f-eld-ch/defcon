import _users from './_users';
import journal from './journal';
import incidents from './incidents';

export default function () {
  _users();
  journal();
  incidents();
}

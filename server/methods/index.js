import journal from './journal';
import incidents from './incidents';
import _users from './_users';

export default function () {
  journal();
  incidents();
  _users();
}

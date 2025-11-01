import { isNil } from 'lodash-es';

export const createStatisticTableRow = (u) => `
  <tr data-id="${u.id}">
    <td>${isNil(u.full_name) ? "no name" : u.full_name}</td>
    <td>${isNil(u.course) ? "no course" : u.course}</td>
    <td>${isNil(u.age) ? "no age" : u.age}</td>
    <td>${isNil(u.gender) ? "no gender" : u.gender}</td>
    <td>${isNil(u.country) ? "no nationality" : u.country}</td>
  </tr>
`;

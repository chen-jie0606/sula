import moment from 'moment';
import MockDate from 'mockdate';

export function openPicker(wrapper, index = 0) {
  wrapper
    .find('input')
    .at(index)
    .simulate('mousedown')
    .simulate('focus');
}

// export function closePicker(wrapper, index = 0) {
//   wrapper
//     .find('input')
//     .at(index)
//     .simulate('blur');
// }

// export function ulSelectCell(wrapper, text, index = 0) {
//   let matchCell;
//   wrapper
//     .find('ul')
//     .at(index)
//     .find('li')
//     .forEach(li => {
//       if (Number(li.text()) === Number(text) && li.props().className.includes('-picker-time-panel-cell')) {
//         matchCell = li;
//         // console.log(li.text(), 'textsfa');
//         li.simulate('click');
//       }
//     });

//   if (!matchCell) {
//     throw new Error('Cell not match in picker panel.');
//   }

//   return matchCell;
// }

export function tableSelectCell(wrapper, text, index = 0) {
  let matchCell;
  wrapper
    .find('table')
    .at(index)
    .find('td')
    .forEach(td => {
      if (td.text() === String(text) && td.props().className.includes('-in-view')) {
        matchCell = td;
        td.simulate('click');
      }
    });

  return matchCell;
}

export function setMockDate(dateString = '2020-05-07T01:02:03+08:00') {
  MockDate.set(moment(dateString));
}

export function resetMockDate() {
  MockDate.reset();
}

export function datepickerValueChange(wrapper) {
  const currentDate = new Date();
  const [fullYear, month, date] = [
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate(),
  ];
  const selectDate = date === 1 ? 2 : 1;
  const expectDate = moment(
    `${fullYear}-${month}-${selectDate}`,
    'YYYY-MM-DD HH:mm:ss',
  );

  const onChange = jest.fn();

  wrapper.setProps({
    onChange,
    allowClear: true,
  });
  openPicker(wrapper);
  tableSelectCell(wrapper, selectDate);

  expect(
    moment(onChange.mock.calls[0][0]).isSame(expectDate, 'date'),
  ).toBeTruthy();
  expect(
    moment(onChange.mock.calls[0][1]).isSame(expectDate, 'date'),
  ).toBeTruthy();

  onChange.mockClear();
}

export function rangepickerValueChange(wrapper) {
  const currentDate = new Date();
  const [fullYear, month, date] = [
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate(),
  ];
  const selectDate = date === 1 ? 2 : 1;
  const expectDate = [moment(
    `${fullYear}-${month}-${selectDate}`,
    'YYYY-MM-DD HH:mm:ss',
  ), moment(
    `${fullYear}-${month}-${selectDate + 1}`,
    'YYYY-MM-DD HH:mm:ss',
  )];
  const onChange = jest.fn();
  wrapper.setProps({
    onChange,
    allowClear: true
  });
  openPicker(wrapper);
  tableSelectCell(wrapper, selectDate);
  tableSelectCell(wrapper, selectDate + 1);

  expect(moment(onChange.mock.calls[0][0][0]).isSame(expectDate[0], 'date')).toBeTruthy();
  expect(moment(onChange.mock.calls[0][0][1]).isSame(expectDate[1], 'date')).toBeTruthy();

  onChange.mockClear();
}

// export function timepickValueChange(wrapper) {
//   const currentDate = new Date();
//   const selectHours = currentDate.getHours();
//   const selectMin = currentDate.getMinutes();
//   const selectSec = currentDate.getSeconds();
//   const expectDate = moment(
//     `${selectHours}:${selectMin}:${selectSec}`,
//     'HH:mm:ss'
//   );
//   const onChange = jest.fn();
//   wrapper.setProps({
//     onChange,
//     allowClear: true
//   });
//   openPicker(wrapper);
//   // ulSelectCell(wrapper, selectHours, 0);
//   // ulSelectCell(wrapper, selectMin, 1);
//   // ulSelectCell(wrapper, selectSec, 2);
//   console.log(onChange.mock.calls, 'test in')
//   // expect(onChange.mock.calls[0][0].isSame(expectDate, 'hours')).toBeTruthy();

//   onChange.mockClear();
// }


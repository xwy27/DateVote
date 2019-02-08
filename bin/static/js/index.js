function formMsg(className, header, msg) {
  $('.message')
    .removeClass('success error warning')
    .addClass(className);
  $('.message header').html(header);
  $('.message p').html(msg);
  $('form').addClass(className);
  setTimeout(() => {
    $('form').removeClass(className);
  }, 3000);
}

$('.dropdown').dropdown();

// Icon
$('.icon').on('click', (ele) => {
  switch(ele.currentTarget.className.split(' icon')[0]) {
    case('github'):
      window.location.href = 'https://github.com/xwy27/datevote';
      break;
    case('user'):
      window.location.href = 'https://github.com/xwy27';
      break;
    default:
      break; 
  }
});

$('.submit').on('click', () => {
  let name = $('input[name="name"]').val();
  let date = $('input[name="date"]').val();
  if (name.length < 1 || date.length < 1) {
    formMsg('warning', 'warning',
      'Complete all the required field!');
  } else {
    axios
      .post('/submit', {
        name: name,
        date: date
      })
      .then((res) => {
        formMsg('success', 'Completed',
          res.data.msg);
      })
      .catch((err) => {
        formMsg('error', 'Error',
          'Something wrong with the remote server');
          console.error(err);
        });
      }
});

$('.download').on('click', () => {
  window.open('/download');
});
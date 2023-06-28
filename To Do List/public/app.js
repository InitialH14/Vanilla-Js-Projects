const judul = document.querySelector('.judul');
const input = document.querySelector('#sect1');
var element1 = React.createElement('h1', {
  children: 'To-do List App'
});
function Input1() {
  var [activity, setActivity] = React.useState('');
  var [list, setList] = React.useState([]);
  var [edit, setEdit] = React.useState({});
  var [message, setMessage] = React.useState('');
  function generate() {
    return Date.now();
  }
  function setAct(event) {
    event.preventDefault();
    if (!activity) {
      setMessage('Tidak ada aktivitas yang ditambahkan');
    } else {
      setMessage('');
      setList([...list, {
        id: generate(),
        activity: activity
      }]);
      setActivity('');
    }
    if (edit.id) {
      const updatedAct = {
        id: edit.id,
        activity
      };
      const editActIndex = list.findIndex(todo => {
        return todo.id == edit.id;
      });
      const updatedActs = [...list];
      updatedActs[editActIndex] = updatedAct;
      setList(updatedActs);
      return cancelEdit();
    }
  }
  function delAct(listing) {
    const filterList = list.filter(value1 => {
      return value1.id !== listing;
    });
    setList(filterList);
    if (edit.id) cancelEdit();
  }
  function editAct(listing) {
    setActivity(listing.activity);
    setEdit(listing);
  }
  function cancelEdit() {
    setEdit({});
    setActivity('');
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      "marginTop": 100,
      "marginLeft": 50
    }
  }, /*#__PURE__*/React.createElement("p", null, "Masukkan aktivitas baru mu!"), /*#__PURE__*/React.createElement("em", null, message), /*#__PURE__*/React.createElement("form", {
    onSubmit: setAct
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Masukkan aktivitas",
    value: activity,
    onChange: event => {
      setActivity(event.target.value);
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "save"
  }, edit.id ? "Simpan Perubahan" : "Tambah"), edit.id && /*#__PURE__*/React.createElement("button", {
    onClick: cancelEdit
  }, "Batal")), /*#__PURE__*/React.createElement("p", null, list != 0 ? "Aktivitasmu hari ini" : "Data belum terisi"), /*#__PURE__*/React.createElement("ol", null, list != [] ? list.map(daftar => {
    return /*#__PURE__*/React.createElement("li", {
      key: daftar.id
    }, /*#__PURE__*/React.createElement("p", {
      className: "isiList"
    }, daftar.activity), /*#__PURE__*/React.createElement("button", {
      onClick: editAct.bind(this, daftar),
      className: "tombol"
    }, " Edit "), /*#__PURE__*/React.createElement("button", {
      onClick: delAct.bind(this, daftar.id),
      className: "tombol"
    }, " X "));
  }) : ''));
  //belajar method array
}

ReactDOM.render(element1, judul);
ReactDOM.render( /*#__PURE__*/React.createElement(Input1, null), input);
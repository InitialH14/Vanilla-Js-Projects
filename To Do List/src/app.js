const judul = document.querySelector('.judul');
const input = document.querySelector('#sect1');


var element1 = React.createElement('h1',{
    children : 'To-do List App'
})

function Input1(){
    var [activity, setActivity] = React.useState('');
    var [list, setList] = React.useState([]);
    var [edit, setEdit] = React.useState({});
    var [message, setMessage] = React.useState('');

    function generate(){
        return Date.now();
    }

    function setAct(event){
        event.preventDefault();

        if(!activity){
            setMessage('Tidak ada aktivitas yang ditambahkan')
        } else{
            setMessage('')
            setList([...list, {
                id : generate(),
                activity : activity,
            },
        ]);
    
            setActivity('');
        }

        if(edit.id){
            const updatedAct = {
                id : edit.id,
                activity
            }

            const editActIndex = list.findIndex((todo) =>{
                return todo.id == edit.id;
            })
            
            const updatedActs = [...list];
            updatedActs[editActIndex] = updatedAct;

            setList(updatedActs);

            return cancelEdit();
        }

        
    }

    function delAct(listing){
        const filterList = list.filter((value1)=>{
            return value1.id !== listing;
        })

        setList(filterList);
        if (edit.id) cancelEdit();
    }

    function editAct(listing){
        setActivity(listing.activity);
        setEdit(listing);
    }

    function cancelEdit(){
        setEdit({});
        setActivity('');
    }

    return (
        <div style = {{
            "marginTop" : 100,
            "marginLeft" : 50,
        }}>
            <p>Masukkan aktivitas baru mu!</p>
            <em>{message}</em>
            <form onSubmit={setAct}>
                <input type="text" placeholder="Masukkan aktivitas" value = {activity} onChange={(event)=>{
                    setActivity(event.target.value);
                }}/>
                <button type="submit" className="save">{edit.id? "Simpan Perubahan" : "Tambah"}</button>
                {edit.id && <button onClick={cancelEdit}>Batal</button>}
                </form>

                <p>{list != 0? "Aktivitasmu hari ini" : "Data belum terisi"}</p>
                <ol>
                    {list != []? list.map((daftar)=>{
                        return <li key={daftar.id}><p className="isiList">{daftar.activity}</p>
                        <button onClick={editAct.bind(this, daftar)} className="tombol"> Edit </button>
                        <button onClick={delAct.bind(this, daftar.id)} className="tombol"> X </button>
                        </li>
                    }) : ''}
                </ol>
            
        </div>
    )
    //belajar method array

}

ReactDOM.render(element1, judul);
ReactDOM.render(<Input1/>, input);
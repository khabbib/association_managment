import { Fragment, useState, useEffect } from "react"

import MaterialTable from 'material-table'
import Container from '@material-ui/core/Container'

const List = ()=>{


    ////////////////////////////////////////////////////////
    // variable
    const [list, setList] = useState([]);
    
    // get info
    const getInfo = async () =>{
        try {
            const data = await fetch('http://localhost:4000/lists')
            const info = await data.json();
            setList(info)
        } catch (error) {
            console.log(error.message)
        }
    }
    
    // delete
    const toDelete = async id =>{
        try {
            const info = await fetch(`http://localhost:4000/lists/${id}`, {method: "delete"})
            setList(list.filter(list => list.id !== id))          
        } catch (error) {
            console.log(error.message)
        }
    }

    // edit input 
    const updateInfo = async row => {
        try {
            const name = row.name
            const lname = row.lname
            const email = row.email
            const address = row.address
            const phone = row.phone
            const status = row.status
            const anteckning = row.anteckning

            const body = {name, lname, email, address, phone, status, anteckning}
            
            await fetch(`http://localhost:4000/lists/${row.id}`, {
                method:"PUT",
                headers: {"Content-Type": "application/json"},
                body:JSON.stringify(body)
            })
            window.location = "/"
        } catch (error) {
            console.log(error.message)
        }
    }

    // add new user
    const addMedlem = (row) =>{
        console.log("row");
        console.log(row);
        const name = row.name
        const lname = row.lname
        const email = row.email
        const address = row.address
        const phone = row.phone
        const status = row.status
        const anteckning = row.anteckning
        console.log(anteckning)
        const body = {name, lname, email, address, phone, status, anteckning}
        console.log(body)
        const res = fetch('http://localhost:4000/list',{ 
            method: "POST",
            headers: {"Content-Type": "application/json"},  
            body: JSON.stringify(body)
        });
        window.location = "/";
        console.log(res)
    }

    // effect
    useEffect(()=>{
        getInfo();
     }, [])


    ////////////////////////////////////////////////////////
    // table titles
    const columns = ([
        {title: "Name", field: "name"},
        {title: "Last Name", field: "lname"},
        {title: "Email", field: "email"},
        {title: "Address", field: "address"},
        {title: "Phone", field: "phone"},
        {title: "Status", field: "status", 
        render:(list)=><div style={{color: list.status=="active"?"green":"red"}}>{list.status}</div>},
        {title: "Anteckning", field: "anteckning",export:true},
    ])


    ////////////////////////////////////////////////////////
    // emails
    

    // single click

    const [m, setAntalPerson] = useState([])
    const [mails, setMailes] = useState([])

    const handleEmails = (s)=>{
        setMailes(mails.concat(s.map(e=>e.email)))      
    }

    const [subject, setSubject] = useState(null)
    const [message, setMessage] = useState(null)
    
    const sendMail = e =>{
        //e.preventDefault();
        try {
            console.log(mails)
            const body = { subject, message, mails} 
            console.log(body)
            fetch('http://localhost:4000/email',{ 
                method: "POST",
                headers: {"Content-Type": "application/json"},  
                body: JSON.stringify(body)
            });
            window.location = "/"
        } catch (error) {
            console.log(error.message)
        }
    }

    return(
        <Fragment>

            {/* material table */}
                <Container maxWidth='lg'>
                    <MaterialTable 
                        columns={columns} 
                        data={list} 
                        title={'Medlemmar'}  
                        editable={{
                            onRowAdd:(medlem)=> addMedlem(medlem),
                            onRowUpdate:(row)=> updateInfo(row),
                            onRowDelete:(e)=>toDelete(e.id)
                        }}
                        options={{
                            exportButton:true,
                            exportFileName:'Meddlemar',
                            selection:true,
                            addRowPosition:'first',
                            actionsColumnIndex:-1,

                        }}
                        actions={[
                            {icon:()=>
                            <button 
                                type="button" 
                                class="btn" 
                                name="email"
                                style={{background: "#4287f5", color: "#eee"}}
                                data-bs-toggle="modal" 
                                data-bs-target={`#open`}>
                                Email
                            </button>,
                            onClick: (evt, data) => handleEmails(data)}
                        ]}
                         
                    />
                </Container>


            {/* email form */}
                
                <div class="modal fade" id={`open`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Send mails</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={sendMail}>
                        <div>
                            <td> you are sending this massage to {m == null ? '' : m } persons.</td>
                            <td> {mails == null ? '' : mails.map(e => <p>{e}</p>)}</td>
                        </div>
                    
                        <div class="modal-body">
                            <label className="label">Subject</label>
                            <input type="text" name="subject" className="form-control mt-1 mb-1" onChange={e => setSubject(e.target.value)} />
                            <label className="label">Message</label>
                            <textarea type="text" name="message" className="form-control mb-1" onChange={e => setMessage(e.target.value)} />
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-warning" onClick={e => sendMail(e)}>Save changes</button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            
            {/* material table */}

        </Fragment>
    )
}

export default List;
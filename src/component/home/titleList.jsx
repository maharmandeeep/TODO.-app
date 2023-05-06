import "./titlelist.scss";


const List=({title,discription,iscompleted,updatehandler,deletehandler,id})=>{


    return(
        <>
         <div className="usercontainer">
            <div className="data">
                <h3>{title}</h3>
                <p>{discription}</p>
                
            </div>

            <div className="right">
                <input onChange={()=>updatehandler(id)} type="checkbox" checked={iscompleted}></input>
                <button onClick={()=>deletehandler(id)}>Delete</button>
            </div>

            </div>

        
        </>
    )
}


export default List;
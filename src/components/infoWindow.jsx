import { Modal } from 'antd';
import layerList from "../libs/sources";
  

let InfoWindow = ({activemap, open, setOpen}) =>{
  return <Modal
      open={open}
      title={layerList[activemap]["title"]}
      footer={null}
      onOk={setOpen}
      onCancel={setOpen}
    >
        <p><b>{ layerList[activemap]["about"] }</b></p>
        <b>Bron:</b>
        <p><i>{ layerList[activemap]["description"] }</i> </p>
        <p><a target="_blank" href={ layerList[activemap]["url"] }>Meer info over deze bron</a></p>    
    </Modal>
}

  export default InfoWindow;
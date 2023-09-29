import { useEffect, useState } from "react";
import apiUrl from "../utils/api";

interface IFile {
  id: string;
  fileName: string
}

type TListOfFiles = IFile[]


const ListOfFiles = () => {
  const [files, setFiles] = useState<TListOfFiles | null>(null)

  useEffect(() => {
    fetch(`${apiUrl}/fileList`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      })
      .then((data: TListOfFiles) => {
        console.log(data)        
        setFiles(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  return (
    <div>
      <p>hi</p>
          {/* {files ? <p>{files}</p> : <p>Loading...</p>} */}
    </div>
  )
}

export default ListOfFiles
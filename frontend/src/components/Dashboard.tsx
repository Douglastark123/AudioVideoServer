import React from 'react'
import apiUrl from '../utils/api'
import File from './File'
import IFile from '../shared/interfaces/IFile'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'

const Dashboard = () => {
  const [files, setFiles] = React.useState<[] | IFile[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [isServerDown, setIsServerDown] = React.useState<boolean>(false)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  React.useEffect(() => {
    fetch(`${apiUrl}/files`)
      .then((response) => {
        if (!response.ok) {
          setIsLoading(false)
          setIsServerDown(true)
          console.log(isServerDown)
        } else {
          return response.json()
        }
      })
      .then(({ files }) => {
        setFiles(files)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(`Error fetching data:`, error)
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <section className="grid w-full max-w-5xl flex-1 grid-cols-5 gap-10 px-4 py-6 sm:px-6 lg:px-8">
        {isLoading ? (
          <p className="col-span-5 text-center align-bottom text-xl">
            Loading...
          </p>
        ) : files.length === 0 ? (
          <p className="col-span-5 text-center align-bottom text-xl">
            No files uploaded.
          </p>
        ) : (
          files.map((file) => (
            <button onClick={onOpen} key={file.id}>
              <File file={file} />
            </button>
          ))
        )}
      </section>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default Dashboard

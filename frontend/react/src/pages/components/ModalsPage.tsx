import React, { useState } from 'react';

import { Modal, Input, Button, Card, Tag } from 'antd';

import { usePageData } from '../../hooks/usePage';
import { IPageData } from '../../interfaces/page';

const modals = {
  basic: 'basic',
  multiplex: 'multiplex',
  withHeader: 'withHeader',
  withCustomHeader: 'withCustomHeader',
  withFooter: 'withFooter',
  withOverlayClose: 'withOverlayClose',
  withCloseBtn: 'withCloseBtn',
  withCustomCloseBtn: 'withCustomCloseBtn',
  withDefaultOverlay: 'withDefaultOverlay',
  withNoOverlay: 'withNoOverlay',
  withOverlayWithoutClose: 'withOverlayWithoutClose',
  withCustomWidth: 'withCustomWidth',
  withFullWidth: 'withFullWidth',
  withCustomHeight: 'withCustomHeight'
};

const pageData: IPageData = {
  fulFilled: true,
  title: 'Modals',
  breadcrumbs: [
    {
      title: 'UI Kit',
      route: 'default-dashboard'
    },
    {
      title: 'Components',
      route: 'default-dashboard'
    },
    {
      title: 'Modals'
    }
  ]
};

const ModalsPage = () => {
  usePageData(pageData);
  const [opened, setOpened] = useState('');

  function openModal(modalName: string) {
    return () => {
      setOpened(modalName);
    };
  }

  function isOpened(modalName: string) {
    return modalName === opened;
  }

  function closeModal() {
    setOpened(null);
  }

  return (
    <>
      <Card title='Simple'>
        <Button onClick={openModal(modals.basic)}>Open modal</Button>
      </Card>

      <Card title='Custom content'>
        <div className='elem-list'>
          <Button onClick={openModal(modals.multiplex)}>Multiplex body</Button>

          <Button onClick={openModal(modals.withHeader)}>With header</Button>

          <Button onClick={openModal(modals.withCustomHeader)}>With custom header</Button>

          <Button onClick={openModal(modals.withFooter)}>With custom footer</Button>
        </div>

        <Modal
          open={isOpened(modals.basic)}
          footer={null}
          closable={false}
          title={null}
          onCancel={closeModal}
        >
          Modal window text content
        </Modal>

        <Modal
          open={isOpened(modals.multiplex)}
          footer={null}
          closable={false}
          title={null}
          onCancel={closeModal}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eum eveniet fugiat fugit
            illum, natus porro possimus quisquam soluta vitae. Aperiam molestias quae quaerat
            quibusdam rerum voluptates! Aspernatur, magnam quas?
          </p>

          <Input placeholder='Subscribe' />
        </Modal>

        <Modal
          open={isOpened(modals.withHeader)}
          footer={null}
          closable={false}
          title={<h3 className='m-0'>Modal with header</h3>}
          onCancel={closeModal}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eum eveniet fugiat fugit
            illum, natus porro possimus quisquam soluta vitae. Aperiam molestias quae quaerat
            quibusdam rerum voluptates! Aspernatur, magnam quas?
          </p>

          <Input placeholder='Subscribe' />
        </Modal>

        <Modal
          open={isOpened(modals.withCustomHeader)}
          footer={null}
          closable={false}
          title={
            <div className='d-flex align-items-center'>
              <h3 className='m-0'>Modal with custom header</h3>
              <Tag className='ml-2' color='#e9e165'>
                New
              </Tag>
            </div>
          }
          onCancel={closeModal}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eum eveniet fugiat fugit
            illum, natus porro possimus quisquam soluta vitae. Aperiam molestias quae quaerat
            quibusdam rerum voluptates! Aspernatur, magnam quas?
          </p>

          <Input placeholder='Subscribe' />
        </Modal>

        <Modal
          open={isOpened(modals.withFooter)}
          closable={false}
          title={null}
          onCancel={closeModal}
          footer={
            <div className='modal-footer text-left'>
              <span>Modal footer</span>
            </div>
          }
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eum eveniet fugiat fugit
            illum, natus porro possimus quisquam soluta vitae. Aperiam molestias quae quaerat
            quibusdam rerum voluptates! Aspernatur, magnam quas?
          </p>

          <Input placeholder='Subscribe' />
        </Modal>
      </Card>

      <Card title='Close options'>
        <div className='elem-list'>
          <Button onClick={openModal(modals.withOverlayClose)}>With overlay close</Button>

          <Button onClick={openModal(modals.withCloseBtn)}>With close btn</Button>

          <Button onClick={openModal(modals.withCustomCloseBtn)}>With custom close btn</Button>
        </div>

        <Modal
          open={isOpened(modals.withOverlayClose)}
          footer={null}
          closable={false}
          title={<h3 className='m-0'>Modal with overlay close</h3>}
          onCancel={closeModal}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eum eveniet fugiat fugit
            illum, natus porro possimus quisquam soluta vitae. Aperiam molestias quae quaerat
            quibusdam rerum voluptates! Aspernatur, magnam quas?
          </p>

          <Input placeholder='Subscribe' />
        </Modal>

        <Modal
          open={isOpened(modals.withCloseBtn)}
          footer={null}
          closable={true}
          title={<h3 className='m-0'>Modal with close btn</h3>}
          onCancel={closeModal}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eum eveniet fugiat fugit
            illum, natus porro possimus quisquam soluta vitae. Aperiam molestias quae quaerat
            quibusdam rerum voluptates! Aspernatur, magnam quas?
          </p>

          <Input placeholder='Subscribe' />
        </Modal>

        <Modal
          open={isOpened(modals.withCustomCloseBtn)}
          closable={false}
          title={<h3 className='m-0'>Modal with custom close</h3>}
          onCancel={closeModal}
          footer={
            <div className='modal-footer d-flex justify-content-between'>
              <Button danger key='back' onClick={closeModal}>
                Close
              </Button>

              <Button className='bg-color-success' key='submit' type='primary'>
                Submit
              </Button>
            </div>
          }
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eum eveniet fugiat fugit
            illum, natus porro possimus quisquam soluta vitae. Aperiam molestias quae quaerat
            quibusdam rerum voluptates! Aspernatur, magnam quas?
          </p>

          <Input placeholder='Subscribe' />
        </Modal>
      </Card>

      <Card title='Overlay'>
        <div className='elem-list'>
          <Button onClick={openModal(modals.withDefaultOverlay)}>Default overlay</Button>

          <Button onClick={openModal(modals.withNoOverlay)}>Without overlay</Button>

          <Button onClick={openModal(modals.withOverlayWithoutClose)}>Overlay without close</Button>
        </div>

        <Modal
          open={isOpened(modals.withDefaultOverlay)}
          title={<h3 className='m-0'>Modal with default overlay</h3>}
          closable={false}
          onCancel={closeModal}
          footer={null}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eum eveniet fugiat fugit
            illum, natus porro possimus quisquam soluta vitae. Aperiam molestias quae quaerat
            quibusdam rerum voluptates! Aspernatur, magnam quas?
          </p>

          <Input placeholder='Subscribe' />
        </Modal>

        <Modal
          open={isOpened(modals.withNoOverlay)}
          footer={null}
          mask={false}
          onCancel={closeModal}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eum eveniet fugiat fugit
            illum, natus porro possimus quisquam soluta vitae. Aperiam molestias quae quaerat
            quibusdam rerum voluptates! Aspernatur, magnam quas?
          </p>

          <Input placeholder='Subscribe' />
        </Modal>

        <Modal
          open={isOpened(modals.withOverlayWithoutClose)}
          closable={true}
          maskClosable={false}
          title={<h3 className='m-0'>Overlay withount close</h3>}
          onCancel={closeModal}
          footer={null}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eum eveniet fugiat fugit
            illum, natus porro possimus quisquam soluta vitae. Aperiam molestias quae quaerat
            quibusdam rerum voluptates! Aspernatur, magnam quas?
          </p>

          <Input placeholder='Subscribe' />
        </Modal>
      </Card>

      <Card title='Width & height' className='mb-0'>
        <div className='elem-list'>
          <Button onClick={openModal(modals.withCustomWidth)}>Custom width</Button>

          <Button onClick={openModal(modals.withFullWidth)}>Full width</Button>

          <Button onClick={openModal(modals.withCustomHeight)}>With custom height</Button>
        </div>
        <Modal
          open={isOpened(modals.withCustomWidth)}
          footer={null}
          width='50%'
          closable={false}
          title={null}
          onCancel={closeModal}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eum eveniet fugiat fugit
            illum, natus porro possimus quisquam soluta vitae. Aperiam molestias quae quaerat
            quibusdam rerum voluptates! Aspernatur, magnam quas?
          </p>

          <Input placeholder='Subscribe' />
        </Modal>

        <Modal
          open={isOpened(modals.withFullWidth)}
          closable={false}
          width='95%'
          title={<h3 className='m-0'>Modal with header</h3>}
          onCancel={closeModal}
          footer={
            <div className='modal-footer d-flex justify-content-between'>
              <Button danger key='back' onClick={closeModal}>
                Close
              </Button>

              <Button className='bg-color-success' key='submit' type='primary'>
                Submit
              </Button>
            </div>
          }
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eum eveniet fugiat fugit
            illum, natus porro possimus quisquam soluta vitae. Aperiam molestias quae quaerat
            quibusdam rerum voluptates! Aspernatur, magnam quas?
          </p>

          <Input placeholder='Subscribe' />
        </Modal>

        <Modal
          open={isOpened(modals.withCustomHeight)}
          footer={null}
          closable={false}
          bodyStyle={{ height: 500, maxHeight: '100%', overflow: 'auto' }}
          title={<h3 className='m-0'>Modal with custom height</h3>}
          onCancel={closeModal}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque eum eveniet fugiat fugit
            illum, natus porro possimus quisquam soluta vitae. Aperiam molestias quae quaerat
            quibusdam rerum voluptates! Aspernatur, magnam quas?
          </p>

          <Input placeholder='Subscribe' />
        </Modal>
      </Card>
    </>
  );
};

export default ModalsPage;

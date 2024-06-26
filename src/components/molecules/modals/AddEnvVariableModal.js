import React, { Fragment, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import Button from 'components/atoms/common/Button';
import { BUTTON_TYPES } from 'constants/Common';
import useEnvStore from 'stores/EnvStore';
import { toast } from 'react-toastify';

const AddEnvVariableModal = ({ closeFn = () => null, open = false, handleAddVariable }) => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeFn}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-full p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <Dialog.Title
                  as='h3'
                  className='pb-4 text-lg font-semibold text-center text-gray-900 border-b border-neutral-300'
                >
                  Add Variable
                </Dialog.Title>
                <div className='mt-6'>
                  <div className='mt-4'>
                    <input
                      id='key'
                      className='block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-blue-300 focus:border-blue-100 focus:ring-blue-100'
                      placeholder='Key'
                      value={key}
                      onChange={(event) => setKey(event.target.value)}
                    />
                  </div>
                  <div className='mt-4'>
                    <input
                      id='value'
                      className='block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-blue-300 focus:border-blue-100 focus:ring-blue-100'
                      placeholder='Value'
                      value={value}
                      onChange={(event) => setValue(event.target.value)}
                    />
                  </div>
                </div>
                <div className='flex items-center gap-2 mt-6'>
                  <Button btnType={BUTTON_TYPES.error} isDisabled={false} onClickHandle={closeFn} fullWidth={true}>
                    Cancel
                  </Button>
                  <Button
                    btnType={BUTTON_TYPES.info}
                    isDisabled={false}
                    fullWidth={true}
                    onClickHandle={() => {
                      const variables = useEnvStore.getState().variables;
                      if (key.trim() === '') {
                        toast.error('Variable name cannot be empty.');
                      } else if (variables[key] != undefined) {
                        toast.error('A variable with the same name already exists.');
                      } else {
                        handleAddVariable(key, value);
                        //reset
                        setKey('');
                        setValue('');
                      }
                      closeFn();
                    }}
                  >
                    Add
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

AddEnvVariableModal.propTypes = {
  closeFn: PropTypes.func.isRequired,
  open: PropTypes.boolean.isRequired,
};

export default AddEnvVariableModal;

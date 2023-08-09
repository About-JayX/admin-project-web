import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import {
  Form,
  MessagePlugin,
  Input,
  Checkbox,
  Button,
  FormInstanceFunctions,
  SubmitContext,
  FormRule,
} from 'tdesign-react';
import { LockOnIcon, UserIcon, BrowseOffIcon, BrowseIcon } from 'tdesign-icons-react';
import useCountdown from '../../hooks/useCountDown';
import { myRules } from './interface';
import Style from './index.module.less';
import { verifyCode } from '@/api/user';

const { FormItem } = Form;

export type ERegisterType = 'phone' | 'email';

export default function Register() {
  //  是否显示密码
  const [showPsw, toggleShowPsw] = useState(false);
  // 计时器
  const { countdown, setupCountdown } = useCountdown(60);
  // form表单对象
  const formRef = useRef<FormInstanceFunctions>();
  // 注册函数
  const onSubmit = async (e: SubmitContext) => {
    if (e.validateResult === true) {
      const { checked } = formRef.current?.getFieldsValue?.(['checked']) as { checked: boolean };
      if (!checked) {
        MessagePlugin.error('请同意 TDesign 服务协议和 TDesign 隐私声明');
        return;
      }
      // 测试axios封装   ---->  local connent success
      const res = await verifyCode({ email: formRef.current?.getFieldValue('email') });

      console.log(res, 'res__');

      // 注册逻辑

      // MessagePlugin.success('注册成功');
    }
  };
  // 集中处理表单验证
  const myRules: myRules<FormRule[]> = {
    email: [
      { required: true, message: '邮箱为必填项', type: 'error' },
      { pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, message: '请输入正确的邮箱', type: 'error' },
    ],
    password: [{ required: true, message: '密码必填', type: 'error' }],
    verifycode: [{ required: true, message: '验证码必填', type: 'error' }],
  };
  return (
    <div>
      <Form
        ref={formRef}
        className={classnames(Style.itemContainer, `register-emails`)}
        labelWidth={0}
        onSubmit={onSubmit}
      >
        <FormItem name='email' rules={myRules.email}>
          <Input size='large' placeholder='请输入邮箱' prefixIcon={<UserIcon />} />
        </FormItem>

        <FormItem name='password' rules={myRules.password}>
          <Input
            size='large'
            type={showPsw ? 'text' : 'password'}
            clearable
            placeholder='请输入登录密码'
            prefixIcon={<LockOnIcon />}
            suffixIcon={
              showPsw ? (
                <BrowseIcon onClick={() => toggleShowPsw((current) => !current)} />
              ) : (
                <BrowseOffIcon onClick={() => toggleShowPsw((current) => !current)} />
              )
            }
          />
        </FormItem>

        <FormItem name='verifyCode' rules={myRules.verifycode}>
          <Input size='large' placeholder='请输入验证码' />
          <Button variant='outline' className={Style.verificationBtn} disabled={countdown > 0} onClick={setupCountdown}>
            {countdown === 0 ? '发送验证码' : `${countdown}秒后可重发`}
          </Button>
        </FormItem>

        <FormItem className={Style.checkContainer} name='checked' initialData={false}>
          <Checkbox>我已阅读并同意 </Checkbox> <span className='tip'>TDesign服务协议</span> 和
          <span className='tip'>TDesign 隐私声明</span>
        </FormItem>

        <FormItem>
          <Button block size='large' type='submit'>
            注册
          </Button>
        </FormItem>
      </Form>
    </div>
  );
}

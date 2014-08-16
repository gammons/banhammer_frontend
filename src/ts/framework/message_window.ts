/// <reference path="../defs/jquery.d.ts"/>
module Crimbo {
  export class MessageWindow {
    notify = (message: string) => {
      $('ul.messages').append("<li>"+message+"</li>");
      $('ul.messages').scrollTop($('.messages')[0].scrollHeight);
    }
  }
}


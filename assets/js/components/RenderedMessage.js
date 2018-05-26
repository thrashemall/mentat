import React, {Component} from 'react';
import {Comment, Label, Dropdown, Input} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import EmojiConvertor from 'emoji-js';
import Linkify from 'react-linkify'
import TimeAgo from 'react-timeago'
import moment from 'moment'
import twitter from 'twitter-text'
import RenderedUrl from './RenderedUrl';

export default class RenderedMessage extends Component {
  constructor(props) {
    super(props);
    this.emoji = new EmojiConvertor();
  }

  render() {
    let labels = this.props.tags.map((t, i) => {
      return (
        <Label size="mini" as='a' key={i} onClick={this.props.onTagClick}>{t}</Label>
      )
    });
    labels[labels.length] = <Label key={labels.length + 1} size='mini'><Input className='newTagInput' onKeyPress={(e) => this.props.handleNewTagOnMessage(e, this.props.id)} transparent placeholder='+'/></Label>

    const emojiText = this.emoji.replace_colons(this.props.text);
    // const urls = twitter.extractUrls(this.props.text).map((url) => url.startsWith('http') ? url : 'https://' + url);
    // const renderedUrls = urls.map((url, i) => {
    //   return ( <RenderedUrl key={i + 1} name={this.props.name} timestamp={moment.utc(this.props.timestamp)} labels={labels} url={url} color={this.props.color} scrollDown={this.props.scrollDown} /> );
    // })
    const comment = (
      <Comment key={0}>
        <Comment.Avatar style={{ backgroundColor: this.props.color, height: '2.5em'}}/>
          <Comment.Content>
            <Comment.Author as='a'>{this.props.name}</Comment.Author>
            <Comment.Metadata>
              <TimeAgo date={moment.utc(this.props.timestamp)} minPeriod={15}/>
              {labels}
            </Comment.Metadata>
          <Comment.Text style={{fontSize: '16px'}}>
            <Linkify>
              {emojiText}
            </Linkify>
            {/* <br />
            {renderedUrls} */}
          </Comment.Text>
        </Comment.Content>
      </Comment>
    );

    return comment;
  }
}
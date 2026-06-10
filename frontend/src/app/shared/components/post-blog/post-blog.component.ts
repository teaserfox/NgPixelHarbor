import {Component, Input, OnInit} from '@angular/core';
import {PostType} from "../../../../types/post.type";
import {environment} from "../../../../environments/environment";


@Component({
  selector: 'post-blog',
  templateUrl: './post-blog.component.html',
  styleUrls: ['./post-blog.component.scss']
})
export class PostBlogComponent implements OnInit {


  @Input() posts: PostType[] = [];
  serverStaticPath = environment.serverStaticPath;


  constructor() {
  }

  ngOnInit(): void {
  }

}

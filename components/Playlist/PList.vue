<template>
	<view class="m-play-list">
		<view
			class="list-item"
			v-for="(item, index) of searchResult.resultList"
			:key="index"
			@click="toSong(item.id, item.name)"
			v-if="resLen"
			:style="type=='toplist' ? orderClass : ''"
		>
		    <view class="order" v-if="type == 'toplist'">{{index+1}}</view>
			<view class="content">
				<view class="title" v-html="keywordHignlight(item.name)"></view>
				<view class="info">
					<image class="tag-icon" :src="vip"  v-if="iconTag(item.privilege.fee,'vip')"></image>
					<image class="tag-icon" :src="cr" v-if="iconTag(item.privilege.flag,'cr')"></image>
					<image class="tag-icon" :src="sq" v-if="iconTag(item.privilege.maxbr, 'sq')"></image>
					<text class="artist" v-html="keywordHignlight(getAr(item.ar)+' - '+item.al.name)"></text>
				</view>
			</view>
			<image class="play-btn" :src="playBtn" />			
		</view>
		<view class="no-result" v-else-if="type == 'toplist' && !resLen">
			暂无搜索结果
		</view>
	</view>
</template>

<script>
	export default {
		name: "PList",
		data() {
			return {
				playBtn: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzJweCIgaGVpZ2h0PSI3MnB4IiB2aWV3Qm94PSIwIDAgNzIgNzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjEgKDc4MTM2KSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5Hcm91cCAxODwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9IjAuMjAwMDAwMDAzIj4KICAgICAgICA8ZyBpZD0i5pCc57SiX+e7k+aenCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTk2MC4wMDAwMDAsIC00NTEuMDAwMDAwKSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjMiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMi1Db3B5LTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCAzOTcuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMTgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDk2MC4wMDAwMDAsIDU0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtNCIgY3g9IjM2IiBjeT0iMzYiIHI9IjM0LjUiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0zNy4xNjExNjkzLDI3LjE5MDY5ODkgTDI2LjM5NTgwODIsNDQuNDE1Mjc2NSBDMjUuODUyMjEyNyw0NS4yODUwMjk0IDI1Ljk3NTkyMyw0NS41MDc5ODkzIDI3LjAwNTc2NjEsNDUuNTA3OTg5MyBMNDkuMDA3MjE2NSw0NS41MDc5ODkzIEM1MC4wNDA1ODM3LDQ1LjUwNzk4OTMgNTAuMTYyNjI1OCw0NS4yODc5OTg5IDQ5LjYxNzE3NDQsNDQuNDE1Mjc2NSBMMzguODUxODEzMywyNy4xOTA2OTg5IEMzOC4yNzA4OTY2LDI2LjI2MTIzMjEgMzcuNzQyMjM2MSwyNi4yNjA5OTIgMzcuMTYxMTY5MywyNy4xOTA2OTg5IFoiIGlkPSJUcmlhbmdsZS0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzOC4wMDcyNDAsIDM2LjAwMDc0OSkgcm90YXRlKDkwLjAwMDAwMCkgdHJhbnNsYXRlKC0zOC4wMDcyNDAsIC0zNi4wMDA3NDkpICI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=",
				orderClass: {
					paddingLeft: '104rpx',
					borderBottom: '0'
				},
				vip: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDVweCIgaGVpZ2h0PSIyN3B4IiB2aWV3Qm94PSIwIDAgNDUgMjciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjEgKDc4MTM2KSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5Hcm91cCAxMDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLmkJzntKJf57uT5p6cIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDguMDAwMDAwLCAtNTA1LjAwMDAwMCkiIHN0cm9rZT0iI0ZFNjcyRSI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0yLUNvcHktMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDM5Ny4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0OC4wMDAwMDAsIDQyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDY2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTMzIiBzdHJva2Utd2lkdGg9IjIiIHg9IjEiIHk9IjEiIHdpZHRoPSI0MyIgaGVpZ2h0PSIyNSIgcng9IjIuMjUiPjwvcmVjdD4KICAgICAgICAgICAgICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJQYXRoLTEwIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgcG9pbnRzPSI3LjUwMzYzMDEgNy40OTg2MDE4OCAxMi41IDE5LjUgMTcuNSA3LjQ5ODYwMTg4Ij48L3BvbHlsaW5lPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjIuNSw3LjUgTDIyLjUsMTkuNSIgaWQ9IlBhdGgtMTEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yOC41MDkwNzk1LDE5LjU1NDE5MDEgTDI4LjUwOTA3OTUsNy41NDE4OTAzOSBDMzQuMDQ3Mjk2Miw3LjU0MTg5MDM5IDM3LjUsNy4wNTQ4NTU0MSAzNy41LDExLjUgQzM3LjUsMTUuOTcxMzY5NyAzNC4wMjE1NzEsMTUuNTA2OTMyMSAyOC41MDkwNzk1LDE1LjUwNjkzMjEiIGlkPSJQYXRoLTEyIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
				cr: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAA2CAMAAAAPkWzgAAAAn1BMVEUAAAD/PDz/Ojr/Pz//Ozv/PDz/Ojr/Ozv/Ozv/Ozv/Ozv/Ozv/Ozv/Ozv/Ojr/Ojr/SUn/UVH/Q0P/Ojr/Ojr/PDz/SUn/Ojr/Ozv/Ozv/PDz/Ojr/Ojr/PT3/Q0P/Ojr/Ojr/Ozv/Ozv/Ozv/QED/Ozv/PT3/Pz//Ojr/Ozv/Ozv/Ozv/Ojr/PT3/Ojr/Ozv/Ozv/PT3/Ojr/Ozv/OjoBugTOAAAANHRSTlMAMvYo61H7wqOvPXCP5u6oBwQV8uJICtaFaVbcXB8PtZ2YfjgcdCMay8Z4TdBCvImCLZFhMy8rFQAAA59JREFUWMPtmGmTojAQhgNoFJT7cBBvxXMcR+3//9u2m8QRFaNVu1Rt1e77gUhr+gndSSfC2MK1oSbZ7gL9O1CjnAVzoVa5zIZaZTO6spoEqP+APwFIO50+U8mLT+abgIW7LNpZ2aMO0GIKrUJ0MXgLEDfAPmK7B/iM3wYwE11kbwGmtPYMlmTY5irAyihrAKj0xrSsAkhCNjrh9dNXAUx4ocazJE/INwfgGqsH4K2h0JbVBGDLkAwmewlwtKeyVQD/C++jEU3/hhQa+OXzTgLIxVNFCoDvFg/o4ccOVKj5mwBPBrf/DsBqV+qoAKw2eKNjFsYSkDdRHKBHrXkHGECl4ucAzabwzLE39wRAKyf54wqwBoP+c0ATv60EjDDBmcG2aJmrAFJaV6gHqE33IkNRKvzxOsDhoaWjBJQ1bwHq4F8LpgLAkoQuGPTJm4B4fLcuPdOJFQAhTIX5DmCZZyBkD6Up2GACt0qA8NxSAeQmI7zr05Rj/RqJtERkchMlYBhSwVMDmmYoD1YfAStmxYTMqU7EVBkiWe4iNWDOgZTlCYWFSjA/ssAkW+/I1IC2GJkA6CTqTi2XAAnLPgq833GANN7b1EwSpgZ8g5C6VLBkpom2E9E41iC1UW6Z0r9Nj+wpAVKrWYOM5tCAiwwlwO/ScOZEwd6WlI45t6SCUrL64yITa5r3PYp+ipepCrBqiUp6wKBXbDhafrUF/bYI/XpHNaYtBj/G4QUKwI6LItHF3z0AmnYpQG0OhcZxMacyWeUsWgSqEDWBn8XO33gAGOUUagQIT8uiRB4EjYZG5f6sAMgTnYnxfAwR7aXWxXbi435SZCKnUPGuCL/Fkbt8WYswFV+PgGb5MDASofbPUZGI41Lml0C94SsAdnIfAT6a+fCmqHwUayvc+mxOJZseiKZTZKgBCVpmt4D1vJl+U98uu8iPzSL2fEoPs7v00ULaFfdKwB4tOxrNkNxOxGyXcjwRoYHrCIM8jk9/FqElDlaGAuCiJdj1HKjSgKH6kqlPZTA0HW8SWQiLjjyuAqxmeT4zi/lowaMcsVHIGQXRdoR5OO/28TYsTwCNYjmpfoLsp+SMrn713tdkdt4vvYT8rBjK4M50L4Klg1BjdU1PHn561YCDXKC0b/Jo4x7SnRbcBi8Vo/TvzsEN62Z+GU+SPIDQzlop9Q589qB+7/t4b5sBym4Htf3L9IPhMPnL/8b+84C6X+fU/kKq9ldqtb8U/AVVMr4btgAV6QAAAABJRU5ErkJggg==",
				sq: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDFweCIgaGVpZ2h0PSIyN3B4IiB2aWV3Qm94PSIwIDAgNDEgMjciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjEgKDc4MTM2KSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5Hcm91cCAxNDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLmkJzntKJf57uT5p6cIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTU5LjAwMDAwMCwgLTUwNS4wMDAwMDApIiBzdHJva2U9IiNGRjNBM0EiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMi1Db3B5LTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCAzOTcuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDguMDAwMDAwLCA0Mi4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDExMS4wMDAwMDAsIDY2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTMzIiBzdHJva2Utd2lkdGg9IjIiIHg9IjEiIHk9IjEiIHdpZHRoPSIzOSIgaGVpZ2h0PSIyNSIgcng9IjIuMjUiPjwvcmVjdD4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTM0Ljg3NSwxOC41NjI1IEwzMy40Mzc1LDE4LjU2MjUgTDMzLjQzNzUsNy4xMjUgQzMzLjQzNzUsNi44MTQzMzk4MyAzMy4xODU2NjAyLDYuNTYyNSAzMi44NzUsNi41NjI1IEwyMi4xMjUsNi41NjI1IEMyMS44MTQzMzk4LDYuNTYyNSAyMS41NjI1LDYuODE0MzM5ODMgMjEuNTYyNSw3LjEyNSBMMjEuNTYyNSwxOS44NzUgQzIxLjU2MjUsMjAuMTg1NjYwMiAyMS44MTQzMzk4LDIwLjQzNzUgMjIuMTI1LDIwLjQzNzUgTDM0Ljg3NSwyMC40Mzc1IEMzNS4xODU2NjAyLDIwLjQzNzUgMzUuNDM3NSwyMC4xODU2NjAyIDM1LjQzNzUsMTkuODc1IEwzNS40Mzc1LDE5LjEyNSBDMzUuNDM3NSwxOC44MTQzMzk4IDM1LjE4NTY2MDIsMTguNTYyNSAzNC44NzUsMTguNTYyNSBaIE0yNS4xMjUsOC40Mzc1IEwyOS44NzUsOC40Mzc1IEMzMC44MDY5ODA1LDguNDM3NSAzMS41NjI1LDkuMTkzMDE5NDggMzEuNTYyNSwxMC4xMjUgTDMxLjU2MjUsMTYuODc1IEMzMS41NjI1LDE3LjgwNjk4MDUgMzAuODA2OTgwNSwxOC41NjI1IDI5Ljg3NSwxOC41NjI1IEwyNS4xMjUsMTguNTYyNSBDMjQuMTkzMDE5NSwxOC41NjI1IDIzLjQzNzUsMTcuODA2OTgwNSAyMy40Mzc1LDE2Ljg3NSBMMjMuNDM3NSwxMC4xMjUgQzIzLjQzNzUsOS4xOTMwMTk0OCAyNC4xOTMwMTk1LDguNDM3NSAyNS4xMjUsOC40Mzc1IFoiIGlkPSJSZWN0YW5nbGUtNDAiIHN0cm9rZS13aWR0aD0iMS4xMjUiIGZpbGw9IiNGRjNBM0EiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE4LjQzNzUsOC40Mzc1IEwxOC40Mzc1LDYuNTYyNSBMNy4xMjUsNi41NjI1IEM2LjgxNDMzOTgzLDYuNTYyNSA2LjU2MjUsNi44MTQzMzk4MyA2LjU2MjUsNy4xMjUgTDYuNTYyNSwxMy44NzUgQzYuNTYyNSwxNC4wMjY3MTM0IDYuNjIyMDc5MDksMTQuMTY3NTc0MiA2LjcyNzI1MjQ0LDE0LjI3Mjc0NzYgQzYuODMyNDI1NzgsMTQuMzc3OTIwOSA2Ljk3MzI4NjU3LDE0LjQzNzUgNy4xMjUsMTQuNDM3NSBMMTYuNTYyNSwxNC40Mzc1IEwxNi41NjI1LDE4LjU2MjUgTDYuNTYyNSwxOC41NjI1IEw2LjU2MjUsMjAuNDM3NSBMMTcuODc1LDIwLjQzNzUgQzE4LjAyNjcxMzQsMjAuNDM3NSAxOC4xNjc1NzQyLDIwLjM3NzkyMDkgMTguMjcyNzQ3NiwyMC4yNzI3NDc2IEMxOC4zNzc5MjA5LDIwLjE2NzU3NDIgMTguNDM3NSwyMC4wMjY3MTM0IDE4LjQzNzUsMTkuODc1IEwxOC40Mzc1LDEzLjEyNSBDMTguNDM3NSwxMi45NzMyODY2IDE4LjM3NzkyMDksMTIuODMyNDI1OCAxOC4yNzI3NDc2LDEyLjcyNzI1MjQgQzE4LjE2NzU3NDIsMTIuNjIyMDc5MSAxOC4wMjY3MTM0LDEyLjU2MjUgMTcuODc1LDEyLjU2MjUgTDguNDM3NSwxMi41NjI1IEw4LjQzNzUsOC40Mzc1IEwxOC40Mzc1LDguNDM3NSBaIiBpZD0iUmVjdGFuZ2xlLTM0IiBzdHJva2Utd2lkdGg9IjEuMTI1IiBmaWxsPSIjRkYzQTNBIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4",
			}
		},
		props: {
			searchResult: {
				keyword: String,
				resultList: Array
			},
			type: String
		},
		computed: {
			keywordHignlight(keyword) {
				return (item) => {
					let key = this.searchResult.keyword
					return item.replace(key, "<span class='Highlight'>" + key + "</span>")
				}
			},
			resLen() {
				return this.searchResult.resultList !== undefined
			}
		},
		methods: {
			getAr(ar) {
				if (ar.length === 1) {
					return ar[0].name
				} else {
					let user = ""
					ar.forEach((item, index) => {
						if (index !== ar.length - 1) {
							user += item.name + " / "
						} else {
							user += item.name
						}
					})
					return user;
				}
			},
			iconTag(flag, tag) {
				
				switch(tag) {
					case "vip": 
						if(flag == 1) {
							return true;
						}		
					case "cr":  
						if(flag >= 60 && flag <= 70) {
							return true;
						}
					case "sq": 
						if( flag == 999000) {
							return true;
						}
				}
	
			},
			toSong(id, name) {
				uni.navigateTo({
					url:"../../pages/Song/Song?id="+ id + "&name="+ name,
					animationType: "pop-in"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.m-play-list {
	    padding: 0 33.336rpx;
		
		.list-item {
		    position: relative;
		    box-sizing: border-box;
		    padding: 29.169rpx 118.7595rpx 29.169rpx 0;
		    height: 125.01rpx;
		    border-bottom: 0.6945rpx solid rgba(0,0,0,.1);
		    color: #333;
		    font-size: 31.2525rpx;
			.order {
			    position: absolute;
			    top: 41.67rpx;
			    left: 0;
			    width: 104.175rpx;
			    color: #999;
			    text-align: center;
			    font-size: 32.6415rpx;
			    line-height: 33.336rpx;
			}
			.content {
			    display: inline-block;
			    width: 100%;
				.title {
				    overflow: hidden;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				    word-break: normal;
				    line-height: 1.5;
				}
				 .info {
				    color: #999;
				    font-size: 22.9185rpx;
					.tag-icon {
					    margin-right: 6.2505rpx;
					    width: 31.2525rpx;
					    height: 18.7515rpx;
					}
					.artist {
						overflow: hidden;
						text-overflow: ellipsis;
						// white-space: nowrap;
						word-break: normal;
					}
					
				}
			}
			.play-btn {
			    position: absolute;
			    top: 37.503rpx;
			    right: 0;
			    width: 50.004rpx;
			    height: 50.004rpx;
			}
		}
		.no-result {
			height: 125.01rpx;
			color: #999;
			text-align: center;
			font-size: 32.6415rpx;
			line-height: 125.01rpx;
		}
	}
</style>

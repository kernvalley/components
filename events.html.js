export default `<div part="container">
	<a class="app-link" href="https://events.kernvalley.us/" target="_parent" rel="noopener noreferrer external">
		<h2 class="center" part="title" class="title">
			<slot name="title">KRV Events Calendar</slot>
			<svg width="12" height="16" fill="currentColor" viewBox="0 0 12 16" class="icon" part="icon link-icon">
				<path fill-rule="evenodd" d="M11 10h1v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h3v1H1v10h10v-3zM6 2l2.25 2.25L5 7.5 6.5 9l3.25-3.25L12 8V2H6z"/>
			</svg>
		</h2>
	</a>
	<div id="events-list" part="list" itemtype="https://schema.org/ItemList" itemscope="">
		<div part="no-events">
			<p>There are currently no events listed on KRV Events.</p>
			<p>
				<span>If you would like to add an event, you may submit one</span>
				<a href="https://events.kernvalley.us/create/" target="_blank" rel="noreferrer noopener external">here.</a>
			</p>
		</div>
	</div>
	<template id="event-template">
		<div class="container" part="event" itemprop="itemListElement" itemtype="https://schema.org/Event" itemscope="">
			<h3 part="name" itemprop="name" class="event-heading">
				<a href="" class="event-url" target="_parent" rel="noopener noreferrer external" itemprop="url">
					<span class="event-name" itemprop="name">Untitled Event</span>
					<!-- <svg width="12" height="16" fill="currentColor" viewBox="0 0 12 16" class="icon" part="icon link-icon">
						<path fill-rule="evenodd" d="M11 10h1v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h3v1H1v10h10v-3zM6 2l2.25 2.25L5 7.5 6.5 9l3.25-3.25L12 8V2H6z"/>
					</svg> -->
				</a>
			</h3>
			<div class="event-section" part="time">
				<div>
					<b>
						<svg width="14" height="16" fill="currentColor" viewBox="0 0 14 16" class="icon" part="icon cal-icon">
							<path fill-rule="evenodd" d="M13 2h-1v1.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5V2H6v1.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5V2H2c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h11c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 12H2V5h11v9zM5 3H4V1h1v2zm6 0h-1V1h1v2zM6 7H5V6h1v1zm2 0H7V6h1v1zm2 0H9V6h1v1zm2 0h-1V6h1v1zM4 9H3V8h1v1zm2 0H5V8h1v1zm2 0H7V8h1v1zm2 0H9V8h1v1zm2 0h-1V8h1v1zm-8 2H3v-1h1v1zm2 0H5v-1h1v1zm2 0H7v-1h1v1zm2 0H9v-1h1v1zm2 0h-1v-1h1v1zm-8 2H3v-1h1v1zm2 0H5v-1h1v1zm2 0H7v-1h1v1zm2 0H9v-1h1v1z"/>
						</svg>
						<span>Start:</span>
					</b>
					<time class="event-start-time" part="start-time" itemprop="startDate"></time>
				</div>
				<div>
					<b>
						<svg width="14" height="16" fill="currentColor" viewBox="0 0 14 16" class="icon" part="icon cal-icon">
							<path fill-rule="evenodd" d="M13 2h-1v1.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5V2H6v1.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5V2H2c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h11c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 12H2V5h11v9zM5 3H4V1h1v2zm6 0h-1V1h1v2zM6 7H5V6h1v1zm2 0H7V6h1v1zm2 0H9V6h1v1zm2 0h-1V6h1v1zM4 9H3V8h1v1zm2 0H5V8h1v1zm2 0H7V8h1v1zm2 0H9V8h1v1zm2 0h-1V8h1v1zm-8 2H3v-1h1v1zm2 0H5v-1h1v1zm2 0H7v-1h1v1zm2 0H9v-1h1v1zm2 0h-1v-1h1v1zm-8 2H3v-1h1v1zm2 0H5v-1h1v1zm2 0H7v-1h1v1zm2 0H9v-1h1v1z"/>
						</svg>
						<span>End:</span>
					</b>
					<time class="event-end-time" part="end-time" itemprop="endDate"></time>
				</div>
			</div>
			<div class="clearfix event-section" part="description">
				<svg width="14" height="16" fill="currentColor" viewBox="0 0 14 16" class="icon float-left" part="icon note-icon">
					<path fill-rule="evenodd" d="M3 10h4V9H3v1zm0-2h6V7H3v1zm0-2h8V5H3v1zm10 6H1V3h12v9zM1 2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1H1z"/>
				</svg>
				<blockquote class="event-description float-left" itemprop="description">This event has no description.</blockquote>
			</div>
			<div class="event-section">
				<svg width="12" height="16" fill="currentColor" viewBox="0 0 12 16" class="icon" part="icon location-icon">
					<path fill-rule="evenodd" d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"/>
				</svg>
				<span class="event-location" part="location" itemprop="location">Unknown Location</span>
			</div>
		</div>
	</template>
</div>`;

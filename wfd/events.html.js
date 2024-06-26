export default `<div part="event" itemtype="https://schema.org/Event" itemscope="">
	<div>
		<a href="" target="_blank" itemprop="url" part="link">
			<!-- Add \`link-external\` icon -->
			<h3 itemprop="name" part="name text"></h3>
			<img loading="lazy" crossorigin="anonymous" referrerpolicy="no-referrer" decoding="async" itemprop="image" part="image" alt="Event Image" />
		</a>
		<div part="time text">
			<!-- \`calendar\` icon -->
			<svg viewBox="0 0 14 16" width="16" height="16" fill="currentColor" part="icon">
				<path fill-rule="evenodd" d="M13 2h-1v1.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5V2H6v1.5c0 .28-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5V2H2c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h11c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 12H2V5h11v9zM5 3H4V1h1v2zm6 0h-1V1h1v2zM6 7H5V6h1v1zm2 0H7V6h1v1zm2 0H9V6h1v1zm2 0h-1V6h1v1zM4 9H3V8h1v1zm2 0H5V8h1v1zm2 0H7V8h1v1zm2 0H9V8h1v1zm2 0h-1V8h1v1zm-8 2H3v-1h1v1zm2 0H5v-1h1v1zm2 0H7v-1h1v1zm2 0H9v-1h1v1zm2 0h-1v-1h1v1zm-8 2H3v-1h1v1zm2 0H5v-1h1v1zm2 0H7v-1h1v1zm2 0H9v-1h1v1z"/>
			</svg>
			<time datetime="" itemprop="startDate" part="start-time"></time>
			<span> &mdash; </span>
			<time datetime="" itemprop="endDate" part="end-time"></time>
		</div>
		<div part="location" itemprop="location" itemtype="https://schema.org/Place" itemscope="">
			<a href="" target="_blank" itemprop="url">
				<h5 part="text">
					<!-- \`mark-location\` icon  -->
					<svg viewBox="0 0 16 16.003" height="16" width="16" fill="currentColor" part="icon">
						<path d="M8 0a5 5 0 0 0-5 5c0 .173.014.332.031.5.014.167.036.336.063.5C3.666 9.514 6 12.003 8 14.003c2-2 4.334-4.489 4.906-8.003a6.38 6.38 0 0 0 .063-.5c.017-.168.03-.327.03-.5a5 5 0 0 0-5-5zm0 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" solid-color="#000000"/>
					</svg>
					<span itemprop="name"></span>
				</h5>
				<div itemprop="geo" itemtype="https://schema.org/GeoLocation" itemscope="" hidden="">
					<meta content="" itemprop="longitude" />
					<meta content="" itemprop="latitude" />
				</div>
			</a>
		</div>
		<details>
			<summary part="text">Event Details</summary>
			<div part="description text" itemprop="description"></div>
		</details>
	</div>
</div>`;

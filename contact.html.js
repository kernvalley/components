export default `<form part="form">
	<fieldset class="no-border">
		<legend part="legend">
			<slot name="legend">Contact KernValley.US</slot>
		</legend>
		<div class="form-group" part="name">
			<label for="contact-name" class="input-label required">Name</label>
			<input type="text" name="name" id="krv-contact-name" class="input" autocomplete="name" placeholder="First Last" required="" />
		</div>
		<div class="form-group" part="email">
			<label for="contact-email" class="input-label required">Email</label>
			<input type="email" name="email" id="krv-contact-email" class="input" autocomplete="email" placeholder="user@example.com" required="" />
		</div>
		<div class="form-group" part="phone">
			<label for="contact-phone" class="input-label">Phone</label>
			<input type="tel" name="phone" id="krv-contact-phone" class="input" autocomplete="tel" placeholder="555-555-5555" />
		</div>
		<div class="form-group" part="url">
			<label for="contact-url" class="input-label">URL</label>
			<input type="url" name="url" id="krv-contact-url" class="input" autocomplete="off" placeholder="https://example.com" />
		</div>
		<div class="form-group" part="subject">
			<label for="contact-subject" class="input-label required">Subject</label>
			<input type="text" name="subject" id="krv-contact-subject" class="input" placeholder="Subject" required="" />
		</div>
		<div class="form-group" part="body">
			<label for="contact-body" class="input-label required">Message</label>
			<textarea name="body" id="krv-contact-body" class="input" placeholder="What would you like to tell us?" required=""></textarea>
		</div>
	</fieldset>
	<div class="flex row space-evenly btns">
		<button type="submit" class="btn btn-accept">
			<slot name="submit">Submit</slot>
		</button>
		<button type="reset" class="btn btn-reject">
			<slot name="reset">Cancel</slot>
		</button>
	</div>
</form>`;

// filterActiveTemplates(){
//   const currentTemplates = this.filteredCanvasTemplates;

//   if(this.filterActive == false){
//     this.filteredCanvasTemplates = this.RemoveNotActiveTemplates(this.filteredCanvasTemplates);
//   }
//   else {
//     this.filteredCanvasTemplates = [...currentTemplates];
//   }

//   console.log('Current:',currentTemplates)
//   console.log('FIltered:',this.filteredCanvasTemplates)
// }

// filterInactiveTemplates(){
//   const currentTemplates = this.filteredCanvasTemplates;

//   if(this.filterInactive == false){
//     this.filteredCanvasTemplates = this.RemoveNotInactiveTemplates(this.filteredCanvasTemplates);
//   }
//   else {
//     this.filteredCanvasTemplates = [...currentTemplates];
//   }
// }

// filterWorkspaceTemplates(){
//   const currentTemplates = this.filteredCanvasTemplates;

//   if(this.filterWorkspace == false){
//     this.filteredCanvasTemplates = this.RemoveNotWorkspaceTemplates(this.filteredCanvasTemplates);
//   }
//   else {
//     this.filteredCanvasTemplates = [...currentTemplates];
//   }
// }

// filterStandardTemplates(){
//   const currentTemplates = this.filteredCanvasTemplates;

//   if(this.filterStandard == false){
//     this.filteredCanvasTemplates = this.RemoveNotStandardTemplates(this.filteredCanvasTemplates);
//   }
//   else {
//     this.filteredCanvasTemplates = [...currentTemplates];
//   }
// }

// filterTemplates(){
//   this.filteredCanvasTemplates = [];
//   if(this.filterActive == true){
//     this.filteredCanvasTemplates = this.filteredCanvasTemplates.concat(this.filterActiveTemplates());
//   }


//   if(this.filterInactive == true){
//     this.filteredCanvasTemplates = this.filteredCanvasTemplates.concat(this.filterInactiveTemplates());
//   }


//   if(this.filterWorkspace == true){
//     this.filteredCanvasTemplates = this.filteredCanvasTemplates.concat(this.filterWorkspaceTemplates());
//   }


//   if(this.filterStandard == true){
//     this.filteredCanvasTemplates = this.filteredCanvasTemplates.concat(this.filterStandardTemplates());
//   }

//   this.filteredCanvasTemplates = this.filteredCanvasTemplates.filter(
//     (template, index, self) => index === self.findIndex((t) => (
//          this.checkEqual(template, t)
//       )
//     )
//   )

// }

// filterActiveTemplates():CanvasTemplate[]{

//   const templates = this.canvasTemplates.filter(
//     template => template.IsActive == true
//   )

//   return templates;
// }

// filterInactiveTemplates():CanvasTemplate[]{

//   const templates = this.canvasTemplates.filter(
//     template => template.IsActive == false
//   )

//   return templates;
// }

// filterWorkspaceTemplates():CanvasTemplate[]{
//   const templates = this.canvasTemplates.filter(
//     template => template.WorkspaceCode == this.workspaceID
//   )

//   return templates;
// }

// filterStandardTemplates():CanvasTemplate[]{
//   return this.canvasTemplates.filter(
//     template => template.WorkspaceCode != this.workspaceID
//   )
// }

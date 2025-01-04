var u=globalThis.imports||{},p=u;var T=p;import g from"gi://Gio?version=2.0";var d=g;var F=d;import G from"gi://GLib?version=2.0";var f=G;var Z=f;import B from"gi://Gtk?version=4.0";var b=B;var P=b;import k from"gi://GLib?version=2.0";import j from"gi://GObject?version=2.0";import i from"gi://Gtk?version=4.0";import x from"gi://Gdk?version=4.0";import _ from"gi://Graphene?version=1.0";i.init();var l=class extends i.Widget{customMethod(){console.log("Hello from CustomWidget.customMethod")}vfunc_measure(e,n){let[t,r]=[100,200],[a,m]=[20,40],c=e===i.Orientation.HORIZONTAL;return[c?t:a,c?r:m,c?a:t,c?m:r]}vfunc_snapshot(e){let n=this.get_allocated_width(),t=new x.RGBA;t.parse("red");let r=new _.Rect().init(10,10,n/2,10);e.append_color(t,r)}},ut=j.registerClass({GTypeName:"CustomWidget"},l),h=k.MainLoop.new(null,!1),s=new i.Application({applicationId:"com.github.jumplink.gjs.demo",flags:0});s.connect("activate",y);var w=s.run([]);console.log("Finished with status:",w);function y(){let o=new i.ApplicationWindow({application:s});o.set_title("Window"),o.set_default_size(500,500),o.connect("close-request",v),o.fullscreen();let e=A(),n=i.Builder.new_from_string(e,e.length),t=n.get_object("root");n.get_object("homeButton")?.connect("clicked",()=>{console.log("Home button clicked")}),n.get_object("aboutButton")?.connect("clicked",()=>{console.log("About button clicked")}),t&&o.set_child(t),o.present(),h.run()}function v(){return h.quit(),s.quit(),!1}function A(){return`
    <?xml version="1.0" encoding="UTF-8"?>
    <interface>
      <requires lib="gtk" version="4.0"/>
      <object class="GtkBox" id="root">
        <property name="orientation">vertical</property>
        <child>
          <object class="GtkBox" id="navbar">
            <property name="orientation">horizontal</property>
            <child>
              <object class="GtkButton" id="homeButton">
                <property name="label" translatable="yes">Home</property>
              </object>
            </child>
            <child>
              <object class="GtkButton" id="aboutButton">
                <property name="label" translatable="yes">About</property>
              </object>
            </child>
          </object>
        </child>
      </object>
    </interface>
  `}
//# sourceMappingURL=main.js.map

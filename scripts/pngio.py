"""Dependency-free PNG read/write for generating pixel-art textures (no Pillow on this machine).

Usage (run with `python -I`, add scripts/ to sys.path):
    import pngio
    w, h, px = pngio.read("models-src/textures/desk_texture.png")   # px: list of (r, g, b, a), row-major
    pngio.write("models-src/textures/new_texture.png", w, h, px)
"""
import zlib,struct
def read(path):
    b=open(path,'rb').read();i=8;idat=b'';pal=[];trns=b'';
    while i<len(b):
        n,t=struct.unpack('>I4s',b[i:i+8]);d=b[i+8:i+8+n];i+=12+n
        if t==b'IHDR':w,h,bd,ct=struct.unpack('>IIBB',d[:10])
        elif t==b'IDAT':idat+=d
        elif t==b'PLTE':pal=[tuple(d[j:j+3]) for j in range(0,len(d),3)]
        elif t==b'tRNS':trns=d
    assert bd==8,(bd,ct)
    bpp={6:4,2:3,0:1,4:2,3:1}[ct];raw=zlib.decompress(idat);st=w*bpp;out=[];prev=bytearray(st);p=0
    for y in range(h):
        f=raw[p];p+=1;line=bytearray(raw[p:p+st]);p+=st
        for x in range(st):
            a=line[x-bpp] if x>=bpp else 0;c=prev[x-bpp] if x>=bpp else 0;bb=prev[x]
            if f==1:line[x]=(line[x]+a)&255
            elif f==2:line[x]=(line[x]+bb)&255
            elif f==3:line[x]=(line[x]+(a+bb)//2)&255
            elif f==4:
                pp=a+bb-c;pa,pb,pc=abs(pp-a),abs(pp-bb),abs(pp-c)
                line[x]=(line[x]+(a if pa<=pb and pa<=pc else bb if pb<=pc else c))&255
        prev=line
        for x in range(w):
            px=tuple(line[x*bpp:(x+1)*bpp])
            if ct==2:px=px+(255,)
            elif ct==0:px=(px[0],)*3+(255,)
            elif ct==4:px=(px[0],)*3+(px[1],)
            elif ct==3:
                k=px[0];px=pal[k]+((trns[k] if k<len(trns) else 255),)
            out.append(px)
    return w,h,out
def write(path,w,h,px):
    raw=b''.join(b'\x00'+bytes(c for p in px[y*w:(y+1)*w] for c in p) for y in range(h))
    ch=lambda t,d: struct.pack('>I',len(d))+t+d+struct.pack('>I',zlib.crc32(t+d)&0xffffffff)
    open(path,'wb').write(b'\x89PNG\r\n\x1a\n'+ch(b'IHDR',struct.pack('>IIBBBBB',w,h,8,6,0,0,0))+ch(b'IDAT',zlib.compress(raw,9))+ch(b'IEND',b''))
